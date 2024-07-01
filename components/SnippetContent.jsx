"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyCodeButton from "@/components/CopyCodeButton";
import SnippetActions from "@/components/SnippetActions";
import { useSnippets } from "@/app/context/SnippetContext";
import { PlusCircleIcon } from "lucide-react";

export default function SnippetContent() {
	const { selectedSnippet } = useSnippets();

	return (
		<section className="text-white/85 w-3/5 p-6 | bg-snippet | overflow-y-auto">
			{!selectedSnippet ? (
				<div className="text-white">
					<h2 className="text-2xl font-semibold mb-2">Select or Create</h2>
					<p>
						<span className="flex gap-2 italic text-white/75">
							Select a snippet, or use
							<PlusCircleIcon className="text-accent" />
							to create one from the sidebar
						</span>{" "}
					</p>
				</div>
			) : (
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
