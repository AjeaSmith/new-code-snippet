import { PlusCircleIcon } from "lucide-react";

export default function Page({ params }) {
	const { id } = params;

	return !id ? null : (
		<div className="p-6 text-white">
			<h2 className="text-2xl font-semibold mb-2">Select or Create</h2>
			<p>
				<span className="flex gap-2 italic text-white/75">
					Select a snippet, or use
					<PlusCircleIcon className="text-accent" />
					to create one from the sidebar
				</span>{" "}
			</p>
		</div>
	);
}
