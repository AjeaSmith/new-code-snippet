import { truncateText } from "@/lib/utils";
import FolderActions from "./FolderActions";
import { useFolders } from "@/app/context/FolderContext";

export default function FolderItem({ folder }) {
	const { selectedFolder, setSelectedFolder } = useFolders();

	return (
		<li
			key={folder._id}
			onClick={() => setSelectedFolder(folder)}
			className={`py-3 px-2 mt-2 | flex items-center justify-between gap-3 | rounded-md hover:bg-snippet cursor-pointer ${
				selectedFolder?._id === folder._id
					? "bg-snippet text-white"
					: "text-[#78797c]"
			}`}
		>
			<span className="flex items-center gap-x-3 px-3">
				<div
					style={{ backgroundColor: `${folder.color}` }}
					className="w-[8px] h-[8px] | rounded-full"
				/>

				{truncateText(folder.name, 20)}
			</span>
			{selectedFolder?._id === folder._id ? <FolderActions /> : null}
		</li>
	);
}
