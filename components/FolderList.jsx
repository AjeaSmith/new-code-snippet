"use client";

import { FolderPlusIcon } from "lucide-react";
import DialogFolderForm from "./DialogFolderForm";
import { useFolders } from "@/app/context/FolderContext";
import FolderItem from "./FolderItem";
import SkeletonUI from "./SkeletonUI";

export default function FolderList() {
	const { folders, error, isLoading, editLoading } = useFolders();

	if (error)
		return (
			<h2 className="p-6 text-center text-xl font-semibold">
				Sorry, there was an error loading folders. Try again later.
			</h2>
		);

	return (
		<aside className="pt-6 px-4 w-1/5 bg-folder overflow-y-auto text-white">
			<DialogFolderForm>
				<span className="cursor-pointer">
					<FolderPlusIcon />
					New Folder
				</span>
			</DialogFolderForm>
			{isLoading || editLoading && <SkeletonUI />}
			{folders && (
				<nav className="mt-5">
					<ul role="list" aria-label="Folder List">
						{folders.map((folder) => (
							<FolderItem folder={folder} key={folder._id} />
						))}
					</ul>
				</nav>
			)}
		</aside>
	);
}
