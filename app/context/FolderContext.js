"use client";

import {
	createFolder,
	deleteFolderById,
	editFolderById,
} from "@/lib/actions/folder.actions";
import { createContext, useContext, useState } from "react";
import useSWR, { mutate } from "swr";

const FolderContext = createContext();

const fetcher = (url) => fetch(url).then((r) => r.json());

export const FolderProvider = ({ children, initialFolders }) => {
	const [selectedFolder, setSelectedFolder] = useState(
		initialFolders ? initialFolders[0] : null
	);

	const { data: folders, error } = useSWR(`/api/folders`, fetcher, {
		fallbackData: initialFolders,
		revalidateOnReconnect: true,
	});

	// optimistic UI to update the UI locally before network call.
	const updateFolderOptimistically = (folderId, newName) => {
		const optimisticFolders = folders.map((folder) =>
			folder._id === folderId ? { ...folder, name: newName } : folder
		);

		mutate("folders", optimisticFolders, false);
		setSelectedFolder((prev) =>
			prev && prev._id === folderId ? { ...prev, name: newName } : prev
		);
	};

	const handleUpdateFolder = async (folderId, newName) => {
		// Perform optimistic update
		updateFolderOptimistically(folderId, newName);

		try {
			// Make the API call to update the folder
			await editFolderById(folderId, newName);
			// Revalidate the folders list after a successful update
			mutate("folders");
		} catch (error) {
			console.error("Failed to update folder", error);
			// Revert the optimistic update in case of an error
			mutate("folders");
		}
	};

	const addFolder = async (folderData, type) => {
		if (type === "edit") {
			await handleUpdateFolder(selectedFolder._id, folderData.name);
		} else {
			const { folder } = await createFolder(folderData.name);
			mutate("folders");
			setSelectedFolder(folder);
		}
	};

	const deleteFolder = async (folderId) => {
		//TODO: delete folder by ID
		try {
			await deleteFolderById(folderId);
			mutate("folders"); // Revalidate SWR cache

			setSelectedFolder(initialFolders[0]);
		} catch (error) {
			console.log("Error deleting folder", error);
		}
	};

	return (
		<FolderContext.Provider
			value={{
				folders,
				error,
				selectedFolder,
				setSelectedFolder,
				addFolder,
				deleteFolder,
			}}
		>
			{children}
		</FolderContext.Provider>
	);
};

export const useFolders = () => useContext(FolderContext);
