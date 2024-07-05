"use client";

import FolderList from "./FolderList";
import { FolderProvider } from "@/app/context/FolderContext";
import SnippetList from "./SnippetList";
import { SnippetProvider } from "@/app/context/SnippetContext";
import SnippetContent from "./SnippetContent";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();
// const fetchFolders = async () => {
// 	try {
// 		await connectToDB();
// 		const folders = await Folder.find({}).sort({ createdAt: "desc" }).lean();

// 		return folders;
// 	} catch (error) {
// 		handleError(error, "Failed to fetch folders");
// 	}
// };
export default function HomeContent() {
	// const folders = await fetchFolders();

	return (
		<QueryClientProvider client={queryClient}>
			<FolderProvider>
				<SnippetProvider>
					<section className="flex h-screen">
						<FolderList />
						<SnippetList />
						<SnippetContent />
					</section>
				</SnippetProvider>
			</FolderProvider>
		</QueryClientProvider>
	);
}
