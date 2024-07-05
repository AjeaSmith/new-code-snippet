"use client";

import {
	createFolder,
	deleteFolderById,
	editFolderById,
} from "@/lib/actions/folder.actions";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
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
			return await response.json();
		},
	});
	const {
		mutate: editMutate,
		isLoading: editLoading,
		error,
		variables,
	} = useMutation({
		mutationFn: (data) => editFolderById(selectedFolder._id, data),
		onSuccess: (updatedFolder) => {
			queryClient.setQueryData(["folders"], (oldFolders) => {
				return oldFolders.map((folder) =>
					folder._id === updatedFolder._id ? updatedFolder : folder
				);
			});
			setSelectedFolder(updatedFolder)
			queryClient.invalidateQueries(["folders"]);
		},
	});
	const addFolder = async (folderData, type) => {
		if (type === "edit") {
			editMutate(folderData);
		} else {
			const folder = await createFolder(folderData);
			setSelectedFolder(folder);
			// queryClient.invalidateQueries({ queryKey: ["folders"] });
		}
	};
	// const router = useRouter();
	// const [folders, setFolders] = useState([]);
	// const [selectedFolder, setSelectedFolder] = useState(null);
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);

	// const fetchFolders = async () => {
	// 	setIsLoading(true);
	// 	setError(null);
	// 	try {
	// 		const response = await fetch("/api/folders");
	// 		if (!response.ok) {
	// 			const errorText = await response.text();
	// 			throw new Error(`Error ${response.status}: ${errorText}`);
	// 		}
	// 		const data = await response.json();
	// 		setFolders(data);
	// 		if (data.length > 0) {
	// 			setSelectedFolder(data[0]);
	// 		}
	// 	} catch (error) {
	// 		setError(error.message);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchFolders();
	// }, []);

	// const addFolder = async (folderData, type) => {
	// 	setIsLoading(true);
	// 	setError(null);
	// 	try {
	// 		if (type === "edit") {
	// 			const updatedFolder = await editFolderById(
	// 				selectedFolder._id,
	// 				folderData
	// 			);
	// 			setFolders((prevFolders) =>
	// 				prevFolders.map((folder) =>
	// 					folder._id === updatedFolder._id ? updatedFolder : folder
	// 				)
	// 			);
	// 			setSelectedFolder(updatedFolder);
	// 		} else {
	// 			const newFolder = await createFolder(folderData);
	// 			setFolders((prevFolders) => [newFolder, ...prevFolders]);
	// 			setSelectedFolder(newFolder);
	// 		}
	// 	} catch (error) {
	// 		setError(error.message);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	return (
		<FolderContext.Provider
			value={{
				editLoading,
				variables,
				folders,
				selectedFolder,
				setSelectedFolder,
				addFolder,
				isLoading,
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
