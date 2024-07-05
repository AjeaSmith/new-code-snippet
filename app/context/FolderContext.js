"use client";

import {
	createFolder,
	deleteFolderById,
	editFolderById,
} from "@/lib/actions/folder.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
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
	});
	const {
		mutate,
		isPending: editPending,
		variables,
	} = useMutation({
		mutationFn: async (data) => {
			const { updatedFolder } = await editFolderById(selectedFolder._id, data);
			setSelectedFolder(updatedFolder);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["folders"] });
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ["folders"] });
		},
	});

	// const {
	// 	data: folders,
	// 	error,
	// 	mutate,
	// } = useSWR(`${API_BASE_URL}/api/folders`, fetcher, {
	// 	revalidateIfStale: true,
	// 	revalidateOnFocus: false,
	// 	revalidateOnReconnect: false,
	// });

	// console.log("from context", folders);

	// // optimistic UI to update the UI locally before network call.
	// const updateFolderOptimistically = (data) => {
	// 	const optimisticFolders = folders.map((folder) =>
	// 		folder._id === selectedFolder._id
	// 			? { ...folder, name: data.name, color: data.color }
	// 			: folder
	// 	);

	// 	mutate(`${API_BASE_URL}/api/folders`, optimisticFolders, false);
	// 	setSelectedFolder((prev) =>
	// 		prev && prev._id === selectedFolder._id
	// 			? { ...prev, name: data.name, color: data.color }
	// 			: prev
	// 	);
	// };

	// const handleUpdateFolder = async (data) => {
	// 	// Perform optimistic update
	// 	updateFolderOptimistically(data);

	// 	try {
	// 		// Make the API call to update the folder

	// 		mutate(`${API_BASE_URL}/api/folders`, false);
	// 	} catch (error) {
	// 		console.error("Failed to update folder", error);
	// 		// Revert the optimistic update in case of an error
	// 		mutate(`${API_BASE_URL}/api/folders`);
	// 	}
	// };

	const addFolder = async (folderData, type) => {
		if (type === "edit") {
			mutate(folderData);
			// await editFolderById(selectedFolder._id, folderData);
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
