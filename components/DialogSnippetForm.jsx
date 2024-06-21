"use client";

import { EditIcon, PlusCircleIcon } from "lucide-react";
import SnippetForm from "./SnippetForm";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

export default function DialogSnippetForm({ snippet, folderId, type }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="cursor-pointer">
				{type === "edit" ? (
					<EditIcon className="cursor-pointer text-accent" />
				) : (
					<PlusCircleIcon className="text-accent" />
				)}
			</DialogTrigger>
			<SnippetForm
				snippet={snippet}
				folderId={folderId}
				type={type}
				open={open}
				setOpen={setOpen}
			/>
		</Dialog>
	);
}
