"use client";
import { snippets } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SnippetsByFolder() {
	const pathname = usePathname();

	const folderId = pathname.split("/")[2];

	const snippetsByFolder = snippets.filter(
		(snippet) => snippet.folderId === Number(folderId)
	);

	return (
		<aside className="w-1/5 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
			<nav>
				{/* This section will be dynamically updated based on the selected note */}
				<h1 className="text-3xl font-bold mb-6">Items</h1>
				<ul>
					{snippetsByFolder.map((snip) => (
						<li
							key={snip.id}
							className="p-4 hover:bg-gray-200 cursor-pointer rounded-md"
						>
							<Link href={`/notes/${folderId}/items/${snip.id}`}>
								{snip.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
