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
import { useFolders } from "@/app/context/FolderContext";

export default function FolderForm({ type }) {
	const { selectedFolder, addFolder } = useFolders();
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(FolderValidation),
		defaultValues: {
			name: type === "edit" ? selectedFolder.name : "",
		},
	});

	const { isSubmitting } = useFormState({ control: form.control });

	const onSubmit = async (values) => {
		try {
			await addFolder(values, type);
		} catch (error) {
			console.log("Error handling folder actions", error);
		}
		form.reset();
	};
	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader className="mb-2">
				<DialogTitle>
					{type === "edit" ? `Edit ${selectedFolder.name}` : "Create Folder"}
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
									{type === "edit" ? "Saving..." : "Creating..."}
								</div>
							) : (
								<span>{type === "edit" ? "Save Changes" : "Create"}</span>
							)}
						</DialogClose>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}
