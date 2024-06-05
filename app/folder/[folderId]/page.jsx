import EmptyNotesView from "@/components/EmptyNotesView";

export default function Page({ params }) {
	const { id } = params;

	return !id ? <EmptyNotesView /> : null;
}
