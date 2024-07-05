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
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/folders`,
				{ cache: "no-store" }
			);
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			return await response.json();
		},
		staleTime: 0,
		cacheTime: 0,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
	});

	const { mutate: editMutate, isLoading: editLoading } = useMutation({
		mutationFn: (data) => editFolderById(selectedFolder._id, data),
		onSuccess: (updatedFolder) => {
			queryClient.setQueryData(["folders"], (oldFolders) => {
				return oldFolders.map((folder) =>
					folder._id === updatedFolder._id ? updatedFolder : folder
				);
			});
			setSelectedFolder(updatedFolder);
		},
	});
	console.log(folders);
	const addFolder = async (folderData, type) => {
		if (type === "edit") {
			editMutate(folderData);
		} else {
			const folder = await createFolder(folderData);
			setSelectedFolder(folder);
			queryClient.invalidateQueries({ queryKey: ["folders"] });
		}
	};

	return (
		<FolderContext.Provider
			value={{
				folders,
				selectedFolder,
				setSelectedFolder,
				addFolder,
				editMutate,
				isLoading,
				editLoading,
				error,
			}}
		>
			{children}
		</FolderContext.Provider>
	);
};

export const useFolders = () => useContext(FolderContext);

// const deleteFolder = async (folderId) => {
// 	//TODO: delete folder by ID
// 	try {
// 		const { folder } = await deleteFolderById(folderId);
// 		await mutate(`${API_BASE_URL}/api/folders`); // Revalidate SWR cache

// 		setSelectedFolder(initialFolders[0]);

// 		toast.success(`${folder.name} deleted successfully`);
// 	} catch (error) {
// 		console.log("Error deleting folder", error);
// 	}
// 	await mutate(`/api/snippets/${selectedFolder._id}`);
// };
