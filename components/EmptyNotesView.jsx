export default function EmptyNotesView({ params }) {
	return (
		<div className="w-3/4 p-6 overflow-y-auto">
			<h2 className="text-2xl font-semibold mb-4">Select a Snippet</h2>
			<p className="text-gray-700">
				Please select a code snippet from the sidebar.
			</p>
		</div>
	);
}