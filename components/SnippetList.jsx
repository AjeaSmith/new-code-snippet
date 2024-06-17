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
		<aside className="w-1/4 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
			{pathname === "/" ? null : !folderData || !snippetData ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="flex items-center justify-between mb-5">
						<h1 className="text-xl font-bold">
							{truncateText(folderData.name, 20)} ({snippetData.length})
						</h1>
						<div className="flex space-x-3">
							<Link href={`/folder/${folderId}/snippet/create`}>
								<PlusCircleIcon className="text-[#4444FE]" />
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
