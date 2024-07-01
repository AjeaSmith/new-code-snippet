import FolderList from "./FolderList";
import { FolderProvider } from "@/app/context/FolderContext";
import SnippetList from "./SnippetList";
import { SnippetProvider } from "@/app/context/SnippetContext";
import SnippetContent from "./SnippetContent";
import Folder from "@/lib/models/folder.model";
import { connectToDB } from "@/lib/mongoose";
import { handleError } from "@/lib/utils";

const fetchFolders = async () => {
	try {
		await connectToDB();
		const folders = await Folder.find({}).sort({ createdAt: "desc" }).lean();

		return folders;
	} catch (error) {
		handleError(error, "Failed to fetch folders");
	}
};
export default async function HomeContent() {
	const folders = await fetchFolders();

	return (
		<FolderProvider initialFolders={folders}>
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
