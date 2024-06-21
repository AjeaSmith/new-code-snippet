"use client";
import { MoreHorizontal, PencilIcon, Trash } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FolderForm from "./FolderForm";
import { deleteFolderById } from "@/lib/actions/folder.actions";

export default function DialogFolderActions({ folderId }) {
	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<MoreHorizontal className="text-accent/85" />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[200px]">
					<DropdownMenuGroup>
						<DialogTrigger asChild>
							<DropdownMenuItem>
								<span className="cursor-pointer flex">
									<PencilIcon className="mr-2 h-4 w-4" />
									Edit
								</span>
							</DropdownMenuItem>
						</DialogTrigger>

						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="text-red-600"
							onClick={() => deleteFolderById(folderId)}
						>
							<Trash className="mr-2 h-4 w-4" />
							Delete
							<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<FolderForm folderId={folderId} />
		</Dialog>
	);
}
