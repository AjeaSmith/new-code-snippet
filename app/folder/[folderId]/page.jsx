import { PlusCircleIcon } from "lucide-react";

export default function Page({ params }) {
	const { folderId } = params;

	return !folderId ? null : (
		<div className="p-6">
			<h2 className="text-2xl font-semibold mb-2">Select or Create</h2>
			<p>
				<span className="flex gap-2 italic text-gray-700">
					Select a snippet, or use
					<PlusCircleIcon className="text-[#4444FE]" />
					to create one from the sidebar
				</span>{" "}
			</p>
		</div>
	);
}
