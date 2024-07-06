"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFolders } from "./FolderContext";
import {
	createSnippet,
	deleteSnippetById,
	editSnippetById,
} from "@/lib/actions/snippet.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const [selectedSnippet, setSelectedSnippet] = useState(null);

	const { selectedFolder } = useFolders();

	const {
		isLoading,
		error: snippetsError,
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

	const {
		mutate: editMutate,
		isPending: editLoading,
		error: editError,
	} = useMutation({
		mutationFn: (data) => editSnippetById(selectedSnippet._id, data),
		onSuccess: ({ updatedSnippet }) => {
			setSelectedSnippet(updatedSnippet);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ["snippets"] });
		},
	});

	const {
		mutate: addMutation,
		error: addError,
		isPending: addLoading,
	} = useMutation({
		mutationFn: (data) => createSnippet(data, selectedFolder._id),
		onSuccess: ({ snippet }) => {
			setSelectedSnippet(snippet);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ["snippets"] });
		},
	});

	const deleteSnippet = async (snippetId) => {
		//TODO: delete folder by ID
		try {
			await deleteSnippetById(snippetId);
			toast.success("deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["snippets"] });
		} catch (error) {
			console.log("Error deleting snippet", error);
		}
		setSelectedSnippet(null);
	};

	if (addError || editError)
		return (
			<p>
				Oops, something bad happened. Not your fault {addError || editError}
			</p>
		);

	return (
		<SnippetContext.Provider
			value={{
				snippetsError,
				isLoading,
				addLoading,
				editLoading,
				snippets,
				selectedSnippet,
				setSelectedSnippet,
				addMutation,
				editMutate,
				deleteSnippet,
			}}
		>
			{children}
		</SnippetContext.Provider>
	);
};

export const useSnippets = () => useContext(SnippetContext);
