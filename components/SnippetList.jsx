"use client";

import { useEffect, useState } from "react";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import SnippetForm from "./SnippetForm";
import { fetchSnippetsByFolderId } from "@/lib/actions/snippet.actions";
import SnippetItem from "./SnippetItem";
import { fetchFolderById } from "@/lib/actions/folder.actions";
import { truncateText } from "@/lib/utils";

export default function SnippetList() {
	const pathname = usePathname();
	const folderId = pathname.split("/")[2];
	const [folderName, setFolderName] = useState(null);
	const [snippetData, setSnippetData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchFolderData = async () => {
			try {
				const [folderData, snippetsData] = await Promise.all([
					fetchFolderById(folderId),
					fetchSnippetsByFolderId(folderId),
				]);

				setFolderName(folderData);
				setSnippetData(snippetsData);
				setIsLoading(false);
			} catch (error) {
				throw new Error(`Failed to fetch data ${error.message}`);
			}
		};
		fetchFolderData();
	}, [folderId]);

	const [dialogOpen, setDialogOpen] = useState(false);
	const handleOpenClick = () => {
		setDialogOpen(true);
	};
	const handleDeleteClick = () => {};

	return (
		<aside className="w-1/5 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
			<nav>
				{isLoading && <p>Loading....</p>}

				{folderName && folderId && snippetData && (
					<>
						<div className="flex items-center justify-between mb-5">
							<h1 className="text-3xl font-bold">
								{truncateText(folderName.name, 20)} ({snippetData.length})
							</h1>

							<button onClick={handleOpenClick}>
								<PlusCircleIcon />
							</button>
							<button onClick={handleDeleteClick}>
								<Trash2Icon className="text-red-500" />
							</button>
						</div>

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
		</aside>
	);
}
