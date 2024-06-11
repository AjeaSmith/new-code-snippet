"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
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

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import CodeEditor from "./AceEditor";
import { languages } from "@/lib/constants";
import { SnippetValidation } from "@/lib/validations/snippet";
import { createSnippet } from "@/lib/actions/snippet.actions";
import { usePathname } from "next/navigation";

export default function SnippetForm({ open, onOpenChange, folderId }) {
	const pathname = usePathname();
	const form = useForm({
		resolver: zodResolver(SnippetValidation),
		defaultValues: {
			name: "",
			description: "",
			code: "",
			language: "javascript",
		},
	});

	const { watch } = form;

	// Watch the name/language field
	const language = watch("language");

	// Function to handle form reset
	const handleOnClose = (isOpen) => {
		if (!isOpen) {
			form.reset();
		}
		onOpenChange(isOpen);
	};

	const onSubmit = async (values) => {
		form.reset();

		const { name, description, code, language } = values;

		await createSnippet({
			name,
			description,
			code,
			language,
			folderId,
			pathname,
		});

		onOpenChange(false);
	};
	return (
		<Dialog open={open} onOpenChange={handleOnClose}>
			<DialogContent>
				<DialogHeader className="mb-2">
					<DialogTitle>Add a code snippet</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col space-y-5"
					>
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
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description (optional)</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="e.g Remove special characters from url"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="language"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Select a language</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="javascript" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{languages.map((lang) => (
												<SelectItem key={lang} value={lang}>
													{lang}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Write or paste code</FormLabel>
									<FormControl>
										<CodeEditor lang={language} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="mt-5">
							<Button className="bg-[#4444FE]" type="submit">
								Save
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
