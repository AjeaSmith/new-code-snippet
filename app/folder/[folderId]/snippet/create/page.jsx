import SnippetForm from "@/components/SnippetForm";

export default function CreateSnippetPage({ params }) {
	const { folderId } = params;
	return <SnippetForm folderId={folderId} />;
}
