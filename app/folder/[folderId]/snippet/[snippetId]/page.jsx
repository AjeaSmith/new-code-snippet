import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { fetchSnippetById } from "@/lib/actions/snippet.actions";
import CopyCodeButton from "@/components/CopyCodeButton";
import { EditIcon } from "lucide-react";
import DeleteSnippetButton from "@/components/DeleteSnippetButton";

export default async function SnippetViewPage({ params }) {
	const { snippetId } = params;

	const snippet = await fetchSnippetById(snippetId);

	return (
		<section className="text-white/85">
			<div className="flex flex-col justify-between mb-2">
				<div className="flex justify-between items-center">
					<span className="flex items-center gap-3 mb-3">
						<h2 className="text-2xl font-semibold">{snippet.name}</h2>
						<CopyCodeButton snippetCode={snippet.code} />
					</span>
					<div className="flex gap-3">
						<Link
							href={`/folder/${snippet.folderId}/snippet/${snippet._id}/edit`}
						>
							<EditIcon className="cursor-pointer text-accent" />
						</Link>
						<DeleteSnippetButton
							snippetId={snippet._id}
							folderId={snippet.folderId}
						/>
					</div>
				</div>
				<p className="text-white/75">{snippet.description}</p>
			</div>

			<SyntaxHighlighter
				language={snippet.language === "javascript" ? "jsx" : snippet.language}
				className="mt-10"
				style={a11yDark}
				showLineNumbers={true}
			>
				{snippet.code}
			</SyntaxHighlighter>
		</section>
	);
}
