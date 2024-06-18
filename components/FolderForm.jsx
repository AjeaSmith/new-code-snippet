"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { usePathname, useRouter } from "next/navigation";
import { useForm, useFormState } from "react-hook-form";
import { createFolder, editFolderById } from "@/lib/actions/folder.actions";
import { FolderPlusIcon, LoaderCircleIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderValidation } from "@/lib/validations/folder";
import { mutate } from "swr";

export default function FolderForm({ open, onOpenChange, folderName }) {
	const pathname = usePathname();

	const folderId = pathname.split("/")[2];
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(FolderValidation),
		defaultValues: {
			name: "",
		},
	});

	const { isSubmitting } = useFormState({ control: form.control });

	const onSubmit = async (values) => {
		if (folderName) {
			await editFolderById(folderId, values.name);
		} else {
			await createFolder(values.name);
		}
		mutate(`snippets|${folderId}`);
		router.push(`/folder/${folderId}`);
	};
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{!folderName && (
				<DialogTrigger className="mb-2 w-full py-2 | flex items-center justify-center gap-3 | bg-[#4444FE] rounded-md shadow-md | text-white">
					<FolderPlusIcon />
					New Folder
				</DialogTrigger>
			)}

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader className="mb-2">
					<DialogTitle>
						{folderName ? "Edit Name" : "Create Folder"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder={folderName ? `${folderName}` : "e.g React"}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="mt-5">
							<DialogClose
								type="submit"
								disabled={isSubmitting}
								className="bg-accent hover:bg-accent/50 px-4 py-2 rounded-md text-white"
							>
								{isSubmitting ? (
									<>
										<LoaderCircleIcon className="animate-spin mr-2" />
										{folderName ? "Saving..." : "Creating..."}
									</>
								) : (
									<span>{folderName ? "Save Changes" : "Create"}</span>
								)}
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
