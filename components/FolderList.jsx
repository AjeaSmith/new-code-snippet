import { fetchFolders } from "@/lib/actions/folder.actions";
import FolderItem from "./FolderItem";
import { FolderPlusIcon } from "lucide-react";
import DialogFolderForm from "./DialogFolderForm";

export default async function FolderList() {
	/**
	 * Fetches the list of folders from the API.
	 * @returns {Promise<Array>} - A promise that resolves to an array of folder objects.
	 */
	const folders = await fetchFolders();

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
							<FolderItem key={folder._id} folder={folder} role="listitem" />
						);
					})}
				</ul>
			</nav>
		</aside>
	);
}
