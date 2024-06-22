"use client";

import DeleteSnippetButton from "./DeleteSnippetButton";
import DialogSnippetForm from "./DialogSnippetForm";

export default function SnippetActions({snippet}) {
	return (
		<div className="flex gap-3">
			<DialogSnippetForm
				snippet={snippet}
				folderId={snippet.folderId}
				type="edit"
			/>
			<DeleteSnippetButton
				snippetId={snippet._id}
				folderId={snippet.folderId}
			/>
		</div>
	);
}
