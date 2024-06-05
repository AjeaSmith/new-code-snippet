import { fetchFolders } from "@/lib/actions/folder.actions";
import FolderItem from "./FolderItem";
import FolderForm from "./FolderForm";

export default async function FolderList() {
	const folders = await fetchFolders();

	return (
		<aside className="p-4 w-1/5 bg-[#1E1F21] border-r border-gray-200 overflow-y-auto | text-white">
			<FolderForm type="create" />
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
