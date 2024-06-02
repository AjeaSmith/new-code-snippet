import { snippets } from "@/lib/data";

export default function ItemDetailPage({ params }) {
	const { noteId, itemId } = params;

	const snippet = snippets.find(
		(snippet) =>
			snippet.folderId === Number(noteId) && snippet.id === Number(itemId)
	);

	const itemDetail = snippet || "Item not found";

	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">
				Item {itemId} in Note {noteId}
			</h2>
			<p className="text-gray-700">{itemDetail.name}</p>
		</div>
	);
}
