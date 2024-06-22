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
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeleteSnippetButton({ snippetId, folderId }) {
	const router = useRouter();

	const handleDeleteSnippet = async () => {
		try {
			await deleteSnippetById(snippetId);
			mutate(`snippets|${folderId}`);

			toast.success("Deleted snippet successfully");

			setTimeout(() => {
				router.push(`/folder/${folderId}`);
			}, 3000);
			
		} catch (error) {
			toast.error("Oops, there was an error deleting this snippet");
			console.log(`Failed to delete snippet ${error.message}`);
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
