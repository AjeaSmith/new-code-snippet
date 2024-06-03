"use client";

import { FolderPlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
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
import { useState } from "react";

export default function AddFolderButton() {
	const [isFieldEmpty, setFieldEmpty] = useState(true);

	const form = useForm({
		defaultValues: {
			name: "",
		},
	});
	const onSubmit = async (values) => {
		//   TODO: how to disable submit button if name field is empty (ChatGPT)
		console.log(values);
		// TODO: Add Folder
	};
	return (
		<Dialog>
			<DialogTrigger className="my-2 w-full py-2 | flex items-center justify-center gap-3 | bg-[#4444FE] rounded-md shadow-md | text-white">
				<FolderPlusIcon />
				New Folder
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader className="mb-2">
					<DialogTitle>Create a folder</DialogTitle>
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
										<Input type="text" placeholder="React" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="mt-5">
							<Button className="bg-[#21768A]" type="submit">
								Save changes
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
