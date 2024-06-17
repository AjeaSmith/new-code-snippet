import SnippetForm from "@/components/SnippetForm";
import { fetchSnippetById } from "@/lib/actions/snippet.actions";

export default async function EditSnippetPage({ params }) {
	const { snippetId, folderId } = params;
	const snippet = await fetchSnippetById(snippetId);

	return <SnippetForm snippet={snippet} folderId={folderId} />;
}
