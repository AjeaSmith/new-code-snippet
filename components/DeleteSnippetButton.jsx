"use client";
import { Trash2Icon } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { mutate } from "swr";
import { deleteSnippetById } from "@/lib/actions/snippet.actions";

export default function DeleteSnippetButton({ snippetId, folderId }) {
	const handleDeleteSnippet = async () => {
		try {
			await deleteSnippetById(snippetId);
			mutate(`snippets|${folderId}`);
		} catch (error) {
			console.log(`Failed to fetch data ${error.message}`);
		}
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Trash2Icon className="text-red-500 cursor-pointer" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						Deleting this snippet cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleDeleteSnippet()}
						className="bg-red-500 hover:bg-red-700"
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
