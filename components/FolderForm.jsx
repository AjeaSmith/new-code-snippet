"use client";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
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
import { useRouter } from "next/navigation";
import { useForm, useFormState } from "react-hook-form";
import { createFolder, editFolderById } from "@/lib/actions/folder.actions";
import { LoaderCircleIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderValidation } from "@/lib/validations/folder";
import { mutate } from "swr";

export default function FolderForm({ folderId }) {
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(FolderValidation),
		defaultValues: {
			name: "",
		},
	});

	const { isSubmitting } = useFormState({ control: form.control });

	const onSubmit = async (values) => {
		if (folderId) {
			await editFolderById(folderId, values.name);
		} else {
			await createFolder(values.name);
		}
		mutate(`folder|${folderId}`);
		router.refresh();
	};
	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader className="mb-2">
				<DialogTitle>{folderId ? "Edit Name" : "Create Folder"}</DialogTitle>
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
									<Input type="text" placeholder="e.g React" {...field} />
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
								<div className="flex">
									<LoaderCircleIcon className="animate-spin mr-2" />
									{folderId ? "Saving..." : "Creating..."}
								</div>
							) : (
								<span>{folderId ? "Save Changes" : "Create"}</span>
							)}
						</DialogClose>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}
