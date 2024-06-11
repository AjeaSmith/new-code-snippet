import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { fetchSnippetById } from "@/lib/actions/snippet.actions";
import { CopyIcon } from "lucide-react";

export default async function SnippetViewPage({ params }) {
	const { snippetId } = params;

	const snippet = await fetchSnippetById(snippetId);
	return (
		<section>
			<div className="flex justify-between items-center">
				<span>
					<h2 className="text-2xl font-semibold mb-4">Item {snippet.name}</h2>
					<p className="text-gray-700">{snippet.description}</p>
				</span>
				<CopyIcon className="text-[#4444FE] cursor-pointer" />
			</div>

			<SyntaxHighlighter
				language={snippet.language === "javascript" ? "jsx" : snippet.language}
				className="mt-10"
				style={a11yDark}
				showLineNumbers={true}
				wrapLongLines={true}
			>
				{snippet.code}
			</SyntaxHighlighter>
		</section>
	);
}
