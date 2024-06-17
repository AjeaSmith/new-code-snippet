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
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createFolder, editFolderById } from "@/lib/actions/folder.actions";
import { FolderPlusIcon } from "lucide-react";

export default function FolderForm({ open, onOpenChange, type }) {
	const pathname = usePathname();

	const folderId = pathname.split("/")[2];
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			name: "" ,
		},
	});

	const {
		watch,
		formState: { errors },
	} = form;

	// Watch the name field
	const name = watch("name");

	const onSubmit = async (values) => {
		if (type === "edit") {
			await editFolderById(folderId, values.name, pathname);
		} else if (type === "create") {
			await createFolder(values.name, pathname);
		} else {
			return;
		}
		router.push("/");
	};
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{type === "create" && (
				<DialogTrigger className="mb-2 w-full py-2 | flex items-center justify-center gap-3 | bg-[#4444FE] rounded-md shadow-md | text-white">
					<FolderPlusIcon />
					New Folder
				</DialogTrigger>
			)}

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader className="mb-2">
					<DialogTitle>
						{type === "edit" ? "Edit folder" : "Create folder"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							rules={{
								validate: (value) =>
									value.trim() !== "" || "Name cannot be empty or just spaces",
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input type="text" placeholder="React" {...field} />
									</FormControl>
									<FormMessage>
										{errors.name && errors.name.message}
									</FormMessage>
								</FormItem>
							)}
						/>
						<DialogFooter className="mt-5">
							<DialogClose>
								<Button
									className="bg-[#4444FE]"
									type="submit"
									disabled={!name.trim()}
								>
									Save
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
