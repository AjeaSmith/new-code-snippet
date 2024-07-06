"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFolders } from "./FolderContext";
import {
	createSnippet,
	deleteSnippetById,
	editSnippetById,
} from "@/lib/actions/snippet.actions";
import { truncateText } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const [selectedSnippet, setSelectedSnippet] = useState(null);

	const { selectedFolder } = useFolders();

	const {
		isLoading,
		error,
		data: snippets,
	} = useQuery({
		queryKey: ["snippets", selectedFolder?._id],
		queryFn: async () => {
			const response = await fetch(`/api/snippets/${selectedFolder._id}`);
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}
			return response.json();
		},
		enabled: !!selectedFolder,
	});

	useEffect(() => {
		setSelectedSnippet(null); // Reset selected note when folder changes
	}, [selectedFolder]);

	// const handleUpdateSnippet = async (snippetId, data) => {
	// 	try {
	// 		// Make the API call to update the snippet
	// 		const { updatedSnippet } = await editSnippetById(snippetId, data);

	// 		return updatedSnippet;
	// 	} catch (error) {
	// 		toast.error(error);
	// 		// Revert the optimistic update in case of an error
	// 		mutate(`/api/snippets/${selectedFolder._id}`);
	// 	}
	// };

	const addSnippet = async (values, type) => {
		// TODO: Add snippet
		if (type === "edit") {
			const updatedSnippet = await handleUpdateSnippet(
				selectedSnippet._id,
				values
			);

			setSelectedSnippet(updatedSnippet);
			toast.success("Updated successfully!");
		} else {
			try {
				const { snippet } = await createSnippet(values, selectedFolder._id);

				setSelectedSnippet(snippet);
				toast.success(
					`Created ${truncateText(snippet.name, 15)} successfully!`
				);
			} catch (error) {
				toast.error(error);
			}
		}
	};

	const deleteSnippet = async (snippetId) => {
		try {
			await deleteSnippetById(snippetId);
		} catch (error) {
			toast.error(error);
		}
		setSelectedSnippet(null);
	};

	return (
		<SnippetContext.Provider
			value={{
				error,
				isLoading,
				snippets,
				selectedSnippet,
				setSelectedSnippet,
				addSnippet,
				deleteSnippet,
			}}
		>
			{children}
		</SnippetContext.Provider>
	);
};

export const useSnippets = () => useContext(SnippetContext);
