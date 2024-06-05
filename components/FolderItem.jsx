"use client";
import FolderActions from "./FolderActions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { truncateText } from "@/lib/utils";

export default function FolderItem({ folder }) {
	const pathname = usePathname();
	const isActive =
		(pathname.includes(folder._id) && folder._id.length > 1) ||
		pathname === folder._id;
	return (
		<li
			key={folder._id}
			className={`py-3 px-2 mt-2 | flex items-center justify-between gap-3 | rounded-md hover:bg-[#131415] cursor-pointer ${
				isActive && "bg-[#131415]"
			}`}
		>
			<span className="flex items-center gap-x-3 px-3">
				<div
					className={`w-[8px] h-[8px] | rounded-full ${
						isActive ? "bg-green-400" : "bg-green-600"
					}`}
				/>
				<Link
					className={`${isActive ? "text-white" : "text-[#78797c]"}`}
					href={`/folder/${folder._id}`}
				>
					{truncateText(folder.name, 20)}
				</Link>
			</span>
			{isActive ? <FolderActions folderId={folder._id} /> : null}
		</li>
	);
}
