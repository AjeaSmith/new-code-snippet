import { fetchFolders } from "@/lib/actions/folder.actions";
import FolderItem from "./FolderItem";
import { FolderPlusIcon } from "lucide-react";
import DialogFolderForm from "./DialogFolderForm";

export default async function FolderList() {
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
				<ul>
					{folders.map((folder) => {
						return <FolderItem key={folder._id} folder={folder} />;
					})}
				</ul>
			</nav>
		</aside>
	);
}
