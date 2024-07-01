"use client";

import { FolderPlusIcon } from "lucide-react";
import DialogFolderForm from "./DialogFolderForm";
import { useFolders } from "@/app/context/FolderContext";
import { truncateText } from "@/lib/utils";
import FolderActions from "./FolderActions";

export default function FolderList() {
	const { folders, selectedFolder, setSelectedFolder, error } = useFolders();

	if (error)
		return (
			<h2 className="p-6 text-center text-xl font-semibold">
				Sorry, there was error loading folders. Try again later.
			</h2>
		);

	return (
		<aside className="pt-6 px-4 w-1/5 bg-folder overflow-y-auto | text-white">
			<DialogFolderForm>
				<span className="cursor-pointer">
					<FolderPlusIcon />
					New Folder
				</span>
			</DialogFolderForm>

			<nav className="mt-5">
				<ul role="list" aria-label="Folder List">
					{folders.map((folder) => {
						return (
							<li
								key={folder._id}
								onClick={() => setSelectedFolder(folder)}
								className={`py-3 px-2 mt-2 | flex items-center justify-between gap-3 | rounded-md hover:bg-snippet cursor-pointer ${
									selectedFolder._id === folder._id
										? "bg-snippet text-white"
										: "text-[#78797c]"
								}`}
							>
								<span className="flex items-center gap-x-3 px-3">
									<div
										className={`w-[8px] h-[8px] | rounded-full ${
											selectedFolder._id === folder._id
												? "bg-green-400"
												: "bg-green-700"
										}`}
									/>

									{truncateText(folder.name, 20)}
								</span>
								{selectedFolder._id === folder._id ? (
									<FolderActions
										folderId={folder._id}
										folderName={folder.name}
									/>
								) : null}
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
}
