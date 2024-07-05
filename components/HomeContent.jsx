"use client";

import FolderList from "./FolderList";
import { FolderProvider } from "@/app/context/FolderContext";
import SnippetList from "./SnippetList";
import { SnippetProvider } from "@/app/context/SnippetContext";
import SnippetContent from "./SnippetContent";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export default function HomeContent() {
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
