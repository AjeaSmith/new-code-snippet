import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteSnippetButton from "./DeleteSnippetButton";
import { deleteSnippetById } from "@/lib/actions/snippet.actions";
import { truncateText } from "@/lib/utils";
import { mutate } from "swr";

export default function SnippetItem({ snippet, folderId }) {
	const pathname = usePathname();

	const isActive =
		(pathname.includes(snippet._id) && snippet._id.length > 1) ||
		pathname === snippet._id;

	return (
		<Link
			href={`/folder/${folderId}/snippet/${snippet._id}`}
			className={`p-4 mt-2 mb-3 flex items-center justify-between text-white/85 rounded-md cursor-pointer hover:bg-active-snippet hover:border-white/65 ${
				isActive
					? "bg-active-snippet border-2 border-white"
					: "border-2 border-transparent"
			}`}
			style={{ boxSizing: "border-box" }}
		>
			<div className={`flex flex-col ${isActive && "flex-1"}`}>
				<span className="mb-2 text-lg font-semibold">{snippet.name}</span>
				<span
					className={`code-text text-wrap ${
						isActive ? "text-snippet-gray-active" : "text-snippet-gray"
					}`}
				>
					{truncateText(snippet.code, 50)}
				</span>
			</div>

			{/* {isActive && <DeleteSnippetButton snippetId={snippet._id} />} */}
		</Link>
	);
}
