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
		isPending,
		error,
		data: folders,
	} = useQuery({
		queryKey: ["folders"],
		queryFn: () =>
			fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/folders`).then((res) =>
				res.json()
			),
		staleTime: 0,
	});

	const {
		mutate: editMutate,
		isPending: editPending,
		variables,
	} = useMutation({
		mutationFn: async (data) => {
			const { updatedFolder } = await editFolderById(selectedFolder._id, data);
			setSelectedFolder(updatedFolder);
			return updatedFolder;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["folders"] });
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ["folders"] });
		},
	});

	const addFolder = async (folderData, type) => {
		if (type === "edit") {
			editMutate(folderData);
		} else {
			const { folder } = await createFolder(folderData);
			setSelectedFolder(folder);
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
				variables,
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
