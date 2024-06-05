"use client";

import * as React from "react";
import { MoreHorizontal, PencilIcon, Trash } from "lucide-react";

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

export default function FolderActions({ folderId }) {
	const [open, setOpen] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);

	const handleEditClick = () => {
		setDialogOpen(true);
	};
	// form dialog open and close state is handled by dropdown menu items
	return (
		<>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<MoreHorizontal className="text-[#4444FE]/85" />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[200px]">
					<DropdownMenuGroup>
						<DropdownMenuItem onSelect={handleEditClick}>
							<PencilIcon className="mr-2 h-4 w-4" />
							Edit
						</DropdownMenuItem>
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
			<FolderForm open={dialogOpen} onOpenChange={setDialogOpen} type="edit" />
		</>
	);
}
