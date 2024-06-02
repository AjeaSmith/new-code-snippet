import { folders } from "@/lib/data";
import Link from "next/link";

export default function FolderList() {
	return (
		<aside className="w-1/5 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
			<h1 className="text-3xl font-bold mb-6">Notes</h1>
			<nav>
				<ul>
					{folders.map((folder) => (
						<li
							key={folder.id}
							className="p-4 hover:bg-gray-200 cursor-pointer rounded-md"
						>
							<Link href={`/notes/${folder.id}`}>{folder.name}</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
