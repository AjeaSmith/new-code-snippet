import { fetchFolders } from "@/lib/actions/folder.actions";
import FolderItem from "./FolderItem";
import FolderForm from "./FolderForm";

export default async function FolderList() {
	const folders = await fetchFolders();

	return (
		<aside className="pt-6 px-4 w-1/5 bg-folder overflow-y-auto | text-white">
			<FolderForm />
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
