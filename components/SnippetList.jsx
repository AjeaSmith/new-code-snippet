"use client";

import { LoaderCircleIcon } from "lucide-react";

import { truncateText } from "@/lib/utils";
import DialogSnippetForm from "./DialogSnippetForm";
import { useFolders } from "@/app/context/FolderContext";
import { useSnippets } from "@/app/context/SnippetContext";

export default function SnippetList() {
	const { selectedFolder } = useFolders();
	const { snippets, setSelectedSnippet, selectedSnippet, error } =
		useSnippets();

	if (error)
		return (
			<h2 className="p-6 text-center text-xl font-semibold">
				Sorry, there was a problem fetching snippets. Try again later
			</h2>
		);

	return (
		<aside className="py-6 px-4 w-1/4 | bg-snippet border-r-2 border-black | text-white | overflow-y-auto">
			{!selectedFolder || !snippets ? (
				<div className="flex flex-col justify-center items-center my-auto h-[60%]">
					<LoaderCircleIcon className="animate-spin w-10 h-10" />
				</div>
			) : (
				<>
					<div className="mb-8 | flex items-center justify-between">
						<h1 className="text-xl text-white | font-semibold">
							{truncateText(selectedFolder.name, 20)}
							<span className="text-white/50 ml-2">({snippets.length})</span>
						</h1>
						<DialogSnippetForm />
					</div>
					<nav>
						<ul>
							{snippets.map((snippet) => (
								<li
									key={snippet._id}
									onClick={() => setSelectedSnippet(snippet)}
									className={`p-4 mt-2 mb-3 flex items-center justify-between text-white/85 rounded-md cursor-pointer hover:bg-active-snippet hover:border-white/65 ${
										selectedSnippet?._id === snippet._id
											? "bg-active-snippet border-2 border-white"
											: "border-2 border-transparent"
									}`}
								>
									<div
										className={`flex flex-col ${
											selectedSnippet?._id === snippet._id && "flex-1"
										}`}
									>
										<span className="mb-2 text-lg font-semibold">
											{snippet.name}
										</span>
										<span
											className={`code-text text-wrap ${
												selectedSnippet?._id === snippet._id
													? "text-snippet-gray-active"
													: "text-snippet-gray"
											}`}
										>
											{truncateText(snippet.code, 30)}
										</span>
									</div>
								</li>
							))}
						</ul>
					</nav>
				</>
			)}
		</aside>
	);
}
