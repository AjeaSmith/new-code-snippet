"use client";
import { editFolderById } from "@/lib/actions/folder.actions";

export default function AddFolderButton() {
	return (
		<button
			onClick={() =>
				editFolderById({
					id: "665d2f5dfe7051c0c3078f9f",
					name: "Random Snippets",
				})
			}
		>
			Edit folder
		</button>
	);
}
