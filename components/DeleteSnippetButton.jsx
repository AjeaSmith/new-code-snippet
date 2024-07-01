"use client";
import { Trash2Icon } from "lucide-react";
import { useSnippets } from "@/app/context/SnippetContext";

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

export default function DeleteSnippetButton() {
	const { selectedSnippet, deleteSnippet } = useSnippets();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Trash2Icon className="text-red-500 cursor-pointer" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						Deleting {selectedSnippet.name} cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => deleteSnippet(selectedSnippet._id)}
						className="bg-red-500 hover:bg-red-700"
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
