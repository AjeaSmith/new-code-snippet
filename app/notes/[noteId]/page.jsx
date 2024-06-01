import EmptyNotesView from "@/components/EmptyNotesView";

export default function NotePage({ params }) {
	const { id } = params;

	return !id ? <EmptyNotesView /> : null;
}
