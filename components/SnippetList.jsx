"use client";
import { useState } from "react";
import { snippets } from "@/lib/data";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SnippetForm from "./SnippetForm";

export default function SnippetList() {
	const [dialogOpen, setDialogOpen] = useState(false);

	const pathname = usePathname();

	const folderId = pathname.split("/")[2];

	const snippetsByFolder = snippets.filter(
		(snippet) => snippet.folderId === Number(folderId)
	);

	const handleEditClick = () => {
		setDialogOpen(true);
	};

	return (
		<>
			<aside className="w-1/5 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
				<nav>
					{/* This section will be dynamically updated based on the selected note */}
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold">Snippets</h1>
						{folderId && (
							<button onClick={handleEditClick}>
								<PlusCircleIcon />
							</button>
						)}
					</div>
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
			<SnippetForm
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				folderId={folderId}
			/>
		</>
	);
}
