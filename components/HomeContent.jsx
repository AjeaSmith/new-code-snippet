import FolderList from "./FolderList";
import { FolderProvider } from "@/app/context/FolderContext";
import SnippetList from "./SnippetList";
import { SnippetProvider } from "@/app/context/SnippetContext";
import SnippetContent from "./SnippetContent";

export default function HomeContent() {
	return (
		<FolderProvider>
			<SnippetProvider>
				<section className="flex h-screen">
					<FolderList />
					<SnippetList />
					<SnippetContent />
				</section>
			</SnippetProvider>
		</FolderProvider>
	);
}
