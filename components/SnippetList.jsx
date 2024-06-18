"use client";
import Link from "next/link";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";
import SnippetItem from "./SnippetItem";

import { fetchSnippetsByFolderId } from "@/lib/actions/snippet.actions";
import { fetchFolderById } from "@/lib/actions/folder.actions";
import { truncateText } from "@/lib/utils";

export default function SnippetList() {
	const pathname = usePathname();
	const folderId = pathname.split("/")[2];

	const { data: folderData, error: folderError } = useSWR(
		folderId ? `folder|${folderId}` : null,
		() => fetchFolderById(folderId)
	);

	const { data: snippetData, error: snippetError } = useSWR(
		folderId ? `snippets|${folderId}` : null,
		() => fetchSnippetsByFolderId(folderId)
	);

	if (folderError)
		return (
			<p className="mx-5 my-5 text-xl font-semibold">
				Error loading folder: {folderError.message}
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
			{pathname === "/" || pathname === "/folder" ? null : !folderData || !snippetData ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="mb-8 | flex items-center justify-between">
						<h1 className="text-xl text-white/65 | font-semibold">
							{truncateText(folderData.name, 20)} 
							<span className="text-white/50 ml-2">({snippetData.length})</span>
						</h1>
						<div className="flex space-x-3">
							<Link href={`/folder/${folderId}/snippet/create`}>
								<PlusCircleIcon className="text-accent" />
							</Link>
						</div>
					</div>
					<nav>
						{snippetData && (
							<ul>
								{snippetData.map((snippet) => (
									<SnippetItem
										key={snippet._id}
										snippet={snippet}
										folderId={folderId}
									/>
								))}
							</ul>
						)}
					</nav>
				</>
			)}
		</aside>
	);
}
