import FolderForm from "./FolderForm";
import { Dialog, DialogTrigger } from "./ui/dialog";

export default function DialogFolderForm({ children }) {
	return (
		<Dialog>
			<DialogTrigger
				asChild
				className="mb-2 w-full py-2 | flex items-center justify-center gap-3 | bg-[#4444FE] rounded-md shadow-md | text-white"
			>
				{children}
			</DialogTrigger>
			<FolderForm />
		</Dialog>
	);
}
