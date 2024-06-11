import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SnippetItem({ snippet, folderId }) {
	const pathname = usePathname();

	const isActive =
		(pathname.includes(snippet._id) && snippet._id.length > 1) ||
		pathname === snippet._id;
	return (
		<li
			className={`py-3 px-3 mt-2 | flex items-center justify-between gap-3 | rounded-md hover:bg-gray-200 cursor-pointer ${
				isActive && "bg-gray-200"
			}`}
		>
			<Link href={`/folder/${folderId}/snippet/${snippet._id}`}>
				{snippet.name}
			</Link>
		</li>
	);
}
