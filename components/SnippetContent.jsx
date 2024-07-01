"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyCodeButton from "@/components/CopyCodeButton";
import SnippetActions from "@/components/SnippetActions";
import { useSnippets } from "@/app/context/SnippetContext";
import { FolderPlusIcon, PlusCircleIcon } from "lucide-react";
import { useFolders } from "@/app/context/FolderContext";
import EmptyState from "./EmptyState";

export default function SnippetContent() {
	const { selectedSnippet, snippets } = useSnippets();
	const { folders } = useFolders();

	// Determine if folders are present
	const hasFolders = folders && folders.length > 0;

	// Determine if snippets are present
	const hasSnippets = snippets && snippets.length > 0;

	return (
		<section className="text-white/85 w-3/5 p-6 | bg-snippet | overflow-y-auto">
			{!hasFolders && !hasSnippets && (
				<EmptyState title="Create a folder">
					Click
					<FolderPlusIcon className="text-accent" />
					to create a folder
				</EmptyState>
			)}

			{hasFolders && !selectedSnippet && (
				<EmptyState title="Select or Create Snippet">
					Select a snippet, or use
					<PlusCircleIcon className="text-accent" />
					to create one from the sidebar
				</EmptyState>
			)}

			{selectedSnippet && (
				<>
					<div className="flex flex-col justify-between mb-2">
						<div className="flex justify-between items-center">
							<span className="flex items-center gap-3 mb-3">
								<h1 className="text-3xl font-semibold">
									{selectedSnippet.name}
								</h1>
								<CopyCodeButton snippetCode={selectedSnippet.code} />
							</span>
							<SnippetActions />
						</div>
						<p className="text-white/75">{selectedSnippet.description}</p>
					</div>

					<SyntaxHighlighter
						language={
							selectedSnippet.language === "javascript"
								? "jsx"
								: selectedSnippet.language
						}
						className="mt-10"
						style={a11yDark}
						showLineNumbers={true}
					>
						{selectedSnippet.code}
					</SyntaxHighlighter>
				</>
			)}
		</section>
	);
}
