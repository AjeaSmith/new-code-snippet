import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteSnippetButton from "./DeleteSnippetButton";
import { deleteSnippetById } from "@/lib/actions/snippet.actions";

export default function SnippetItem({ snippet, folderId }) {
	const pathname = usePathname();

	const isActive =
		(pathname.includes(snippet._id) && snippet._id.length > 1) ||
		pathname === snippet._id;

	const handleDeleteSnippet = async () => {
		try {
			await deleteSnippetById(snippet._id);
			mutate(`snippets|${folderId}`); // Trigger re-fetch of snippets
			router.push(`/folder/${folderId}`);
		} catch (error) {
			console.log(`Failed to fetch data ${error.message}`);
		}
	};

	return (
		<Link
			href={`/folder/${folderId}/snippet/${snippet._id}`}
			className={`py-3 px-3 mt-2 | flex items-center justify-between gap-3 | rounded-md hover:bg-gray-200 cursor-pointer ${
				isActive && "bg-gray-200"
			}`}
		>
			{snippet.name}
			{isActive && (
				<DeleteSnippetButton handleDeleteSnippet={handleDeleteSnippet} />
			)}
		</Link>
	);
}
