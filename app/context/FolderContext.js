"use client";

import {
	createFolder,
	deleteFolderById,
	editFolderById,
} from "@/lib/actions/folder.actions";

import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const [selectedFolder, setSelectedFolder] = useState(null);

	const {
		isLoading,
		error: foldersError,
		data: folders,
	} = useQuery({
		queryKey: ["folders"],
		queryFn: async () => {
			const response = await fetch("/api/folders");
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			return response.json();
		},
	});

	const {
		mutate: editMutate,
		isPending: editLoading,
		variables,
		error: editError,
	} = useMutation({
		mutationFn: (data) => editFolderById(selectedFolder._id, data),
		onSuccess: ({ updatedData }) => {
			setSelectedFolder(updatedData);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ["folders"] });
		},
	});

	const {
		mutate: addMutation,
		isPending: addLoading,
		error: addError,
	} = useMutation({
		mutationFn: (data) => createFolder(data),
		onSuccess: ({ data }) => {
			setSelectedFolder(data);
			queryClient.invalidateQueries({ queryKey: ["folders"] });
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ["folders"] });
		},
	});
	// const addFolder = async (folderData, type) => {
	// 	if (type === "edit") {
	// 		editMutate(folderData);
	// 		// toast.success("Updated Successfully");
	// 	} else {
	// 		addMutation(folderData);
	// 		// queryClient.invalidateQueries({ queryKey: ["folders"] });
	// 	}
	// };
	const deleteFolder = async (folderId) => {
		//TODO: delete folder by ID
		try {
			const { folder } = await deleteFolderById(folderId);

			setSelectedFolder(folders[0]);

			toast.success(`${folder.name} deleted successfully`);
			queryClient.invalidateQueries({ queryKey: ["folders"] });
		} catch (error) {
			console.log("Error deleting folder", error);
		}
	};

	if (addError || foldersError || editError)
		return (
			<p>
				Oops, something bad happened. Not your fault{" "}
				{addError || foldersError || editError}
			</p>
		);
	return (
		<FolderContext.Provider
			value={{
				variables,
				editLoading,
				folders,
				selectedFolder,
				editMutate,
				addMutation,
				deleteFolder,
				setSelectedFolder,
				isLoading,
			}}
		>
			{children}
		</FolderContext.Provider>
	);
};

export const useFolders = () => useContext(FolderContext);
