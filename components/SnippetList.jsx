"use client";
import { useState } from "react";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import SnippetItem from "./SnippetItem";
import SnippetForm from "./SnippetForm";
import {
	deleteSnippetById,
	fetchSnippetsByFolderId,
} from "@/lib/actions/snippet.actions";
import { fetchFolderById } from "@/lib/actions/folder.actions";
import { truncateText } from "@/lib/utils";

export default function SnippetList() {
	const pathname = usePathname();
	const folderId = pathname.split("/")[2];
	const snippetId = pathname.split("/")[4];
	const [dialogOpen, setDialogOpen] = useState(false);

	const { data: folderData, error: folderError } = useSWR(
		folderId ? `/folder/${folderId}` : null,
		() => fetchFolderById(folderId)
	);

	const {
		data: snippetData,
		error: snippetError,
		mutate,
	} = useSWR(folderId ? `snippets|${folderId}` : null, () =>
		fetchSnippetsByFolderId(folderId)
	);

	const handleOpenClick = () => {
		setDialogOpen(true);
		mutate();
	};
	const handleDeleteClick = async () => {
		try {
			await deleteSnippetById(snippetId);
			mutate();
		} catch (error) {
			console.log(`Failed to fetch data ${error.message}`);
		}
	};

	if (folderError) return <p>Error loading folder: {folderError.message}</p>;
	if (snippetError)
		return <p>Error loading snippets: {snippetError.message}</p>;

	return (
		<aside className="w-1/5 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
			{!folderData || !snippetData ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="flex items-center justify-between mb-5">
						<h1 className="text-3xl font-bold">
							{truncateText(folderData.name, 20)} ({snippetData.length})
						</h1>
						<button onClick={handleOpenClick}>
							<PlusCircleIcon />
						</button>
						{snippetId && (
							<button onClick={handleDeleteClick}>
								<Trash2Icon className="text-red-500" />
							</button>
						)}
					</div>
					<nav>
						{snippetData && (
							<>
								<ul>
									{snippetData.map((snippet) => (
										<SnippetItem
											key={snippet._id}
											snippet={snippet}
											folderId={folderId}
										/>
									))}
								</ul>
							</>
						)}
					</nav>
					<SnippetForm
						open={dialogOpen}
						onOpenChange={setDialogOpen}
						folderId={folderId}
					/>
				</>
			)}
		</aside>
	);
}
