"use client";

import useSWR from "swr";
import { usePathname } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";
import SnippetItem from "./SnippetItem";

import { fetchSnippetsByFolderId } from "@/lib/actions/snippet.actions";
import { fetchFolderById } from "@/lib/actions/folder.actions";
import { truncateText } from "@/lib/utils";
import DialogSnippetForm from "./DialogSnippetForm";

export default function SnippetList() {
	const pathname = usePathname();
	// TODO: Pass folderName through params to avoid fetch request for folder name
	const folderId = pathname.split("/")[2];

	const { data: folderData, error } = useSWR(
		folderId !== "create" && folderId !== undefined
			? `folder|${folderId}`
			: null,
		() => fetchFolderById(folderId)
	);
	const { data: snippetData, error: snippetError } = useSWR(
		folderId !== "create" && folderId ? `snippets|${folderId}` : null,
		() => fetchSnippetsByFolderId(folderId)
	);

	if (error)
		return (
			<p className="mx-5 my-5 text-xl font-semibold">
				Error loading folder: {error.message}
			</p>
		);
	if (snippetError)
		return (
			<p className="mx-5 my-5 text-xl font-semibold">
				Error loading snippets: {snippetError.message}
			</p>
		);

	return (
		<aside className="py-6 px-4 w-1/4 | bg-snippet border-r-2 border-black | text-white | overflow-y-auto">
			{!folderData || !snippetData ? (
				<div className="flex flex-col justify-center items-center my-auto h-[60%]">
					<LoaderCircleIcon className="animate-spin w-10 h-10" />
				</div>
			) : (
				<>
					<div className="mb-8 | flex items-center justify-between">
						<h1 className="text-xl text-white | font-semibold">
							{truncateText(folderData.name, 20)}
							<span className="text-white/50 ml-2">({snippetData.length})</span>
						</h1>
						<DialogSnippetForm folderId={folderId} />
					</div>
					<nav>
						<ul>
							{snippetData.map((snippet) => (
								<SnippetItem
									key={snippet._id}
									snippet={snippet}
									folderId={folderId}
								/>
							))}
						</ul>
					</nav>
				</>
			)}
		</aside>
	);
}
