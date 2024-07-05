"use client";

import {
	createFolder,
	deleteFolderById,
	editFolderById,
} from "@/lib/actions/folder.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
	const queryClient = useQueryClient();

	const [selectedFolder, setSelectedFolder] = useState(null);

	const {
		isLoading,
		error,
		data: folders,
	} = useQuery({
		queryKey: ["folders"],
		queryFn: async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/folders`
			);
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			return response.json();
		},
		staleTime: 0,
		cacheTime: 0,
	});

	const { mutate: editMutate, isPending: editPending } = useMutation({
		mutationFn: async (data) => {
			const response = await editFolderById(selectedFolder._id, data);
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			const updatedFolder = await response.json();
			setSelectedFolder(updatedFolder);
			return updatedFolder;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["folders"] });
		},
	});

	const addFolder = async (folderData, type) => {
		if (type === "edit") {
			editMutate(folderData);
		} else {
			const { folder } = await createFolder(folderData);
			setSelectedFolder(folder);
			queryClient.invalidateQueries({ queryKey: ["folders"] });
		}
	};

	const deleteFolder = async (folderId) => {
		//TODO: delete folder by ID
		try {
			const { folder } = await deleteFolderById(folderId);
			await mutate(`${API_BASE_URL}/api/folders`); // Revalidate SWR cache

			setSelectedFolder(initialFolders[0]);

			toast.success(`${folder.name} deleted successfully`);
		} catch (error) {
			console.log("Error deleting folder", error);
		}
		await mutate(`/api/snippets/${selectedFolder._id}`);
	};

	return (
		<FolderContext.Provider
			value={{
				isLoading,
				editPending,
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
