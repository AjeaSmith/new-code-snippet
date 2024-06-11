import EmptyNotesView from "@/components/EmptyNotesView";

export default function Page({ params }) {
	const { folderId } = params;

	return !folderId ? <EmptyNotesView /> : null;
}
