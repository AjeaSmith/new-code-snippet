import EmptyNotesView from "@/components/EmptyNotesView";

export default function Page({ params }) {
	const { folderId } = params;
	console.log(folderId)

	return !folderId ? <EmptyNotesView /> : null;
}
