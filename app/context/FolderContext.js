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
	});

	// optimistic UI to update the UI locally before network call.
	const updateFolderOptimistically = (data) => {
		const optimisticFolders = folders.map((folder) =>
			folder._id === selectedFolder._id
				? { ...folder, name: data.name, color: data.color }
				: folder
		);

		mutate("/api/folders", optimisticFolders, false);
		setSelectedFolder((prev) =>
			prev && prev._id === selectedFolder._id
				? { ...prev, name: data.name, color: data.color }
				: prev
		);
	};

	const handleUpdateFolder = async (data) => {
		// Perform optimistic update
		updateFolderOptimistically(selectedFolder._id, data);

		try {
			// Make the API call to update the folder
			await editFolderById(selectedFolder._id, data);
		} catch (error) {
			console.error("Failed to update folder", error);
			// Revert the optimistic update in case of an error
			mutate("/api/folders");
		}
	};

	const addFolder = async (folderData, type) => {
		if (type === "edit") {
			await handleUpdateFolder(folderData);
		} else {
			const { folder } = await createFolder(folderData);
			setSelectedFolder(folder);
		}
		mutate("/api/folders");
	};

	const deleteFolder = async (folderId) => {
		//TODO: delete folder by ID
		try {
			await deleteFolderById(folderId);
			mutate("/api/folders"); // Revalidate SWR cache

			setSelectedFolder(initialFolders[0]);
		} catch (error) {
			console.log("Error deleting folder", error);
		}
		mutate(`/api/snippets/${selectedFolder._id}`);
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
