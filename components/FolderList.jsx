import { fetchFolders } from "@/lib/actions/folder.actions";

import Link from "next/link";
import AddFolderButton from "./AddFolderButton";
import { FolderClosedIcon, MoreHorizontalIcon } from "lucide-react";
import FolderActions from "./FolderActions";

export default async function FolderList() {
	const folders = await fetchFolders();

	return (
		<aside className="p-4 w-1/5 bg-[#1E1F21] border-r border-gray-200 overflow-y-auto | text-white">
			<AddFolderButton />
			<nav className="mt-5 text-light-2">
				<ul>
					{folders.map((folder) => (
						<li
							key={folder._id}
							className="py-3 px-2 mt-2 | flex items-center justify-between gap-3 | rounded-md hover:bg-[#131415] cursor-pointer"
						>
							<span className="flex items-center gap-3">
								<FolderClosedIcon fill="#fff" />
								<Link href={`/folder/${folder._id}`}>{folder.name}</Link>
							</span>
							<FolderActions />
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
