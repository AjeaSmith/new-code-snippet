import { truncateText } from "@/lib/utils";
import FolderActions from "./FolderActions";
import { useFolders } from "@/app/context/FolderContext";
import { LoaderCircleIcon } from "lucide-react";

export default function FolderItem({ folder }) {
	const { selectedFolder, setSelectedFolder, editLoading } = useFolders();

	return (
		<li
			key={folder._id}
			onClick={() => setSelectedFolder(folder)}
			className={`py-3 px-2 mt-2 | flex items-center justify-between | rounded-md hover:bg-snippet cursor-pointer ${
				selectedFolder?._id === folder._id
					? "bg-snippet text-white"
					: "text-[#78797c]"
			}`}
		>
			<span className="px-3 gap-x-3 | flex items-center flex-auto">
				<div
					style={{ backgroundColor: `${folder.color}` }}
					className="w-[8px] h-[8px] | rounded-full"
				/>

				{truncateText(folder.name, 12)}
			</span>

			<div>{selectedFolder?._id === folder._id && <FolderActions />}</div>
		</li>
	);
}
