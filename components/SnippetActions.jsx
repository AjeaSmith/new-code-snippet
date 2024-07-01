import DeleteSnippetButton from "./DeleteSnippetButton";
import DialogSnippetForm from "./DialogSnippetForm";

export default function SnippetActions() {
	return (
		<div className="flex gap-3">
			<DialogSnippetForm type="edit" />
			<DeleteSnippetButton />
		</div>
	);
}
