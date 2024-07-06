"use client";
import { useEffect } from "react";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SnippetValidation } from "@/lib/validations/snippet";
import {
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

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { languages } from "@/lib/constants";
import CodeEditor from "./AceEditor";
import { LoaderCircleIcon } from "lucide-react";
import {
	DialogHeader,
	DialogTitle,
	DialogContent,
	DialogFooter,
} from "./ui/dialog";

import { useSnippets } from "@/app/context/SnippetContext";

export default function SnippetForm({ type, setOpen }) {
	const { editMutate, addMutation, selectedSnippet } = useSnippets();

	const form = useForm({
		resolver: zodResolver(SnippetValidation),
		defaultValues: {
			name: "",
			description: "",
			code: "",
			language: "javascript",
		},
	});
	// Watch selectedSnippet and reset form values when it changes
	useEffect(() => {
		if (type === "edit" && selectedSnippet) {
			form.reset({
				name: selectedSnippet.name,
				description: selectedSnippet.description,
				code: selectedSnippet.code,
				language: selectedSnippet.language,
			});
		}
	}, [selectedSnippet, type, form.reset]);

	const { isSubmitting } = useFormState({ control: form.control });

	const language = form.watch("language");

	const onSubmit = async (values) => {
		try {
			if (type === "edit") {
				editMutate(values);
			} else {
				addMutation(values);
			}
			form.reset();
		} catch (error) {
			console.log("Error handling folder actions", error);
		}
		setOpen(false);
	};

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					{type === "edit"
						? `Editing: ${selectedSnippet.name} `
						: "Create a snippet"}
				</DialogTitle>
			</DialogHeader>
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5"
				>
					{["name", "description"].map((field) => (
						<FormField
							key={field}
							control={form.control}
							name={field}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{field.name.charAt(0).toUpperCase() + field.name.slice(1)}
									</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
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
									<CodeEditor
										lang={language}
										value={field.value}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DialogFooter className="flex justify-end">
						<Button
							type="submit"
							disabled={isSubmitting}
							className="bg-accent hover:bg-accent/50"
						>
							{isSubmitting ? (
								<>
									<LoaderCircleIcon className="animate-spin mr-2" />
									{type === "edit" ? "Saving..." : "Creating..."}
								</>
							) : (
								<span>{type === "edit" ? "Save Changes" : "Create"}</span>
							)}
						</Button>
					</DialogFooter>
				</form>
			</FormProvider>
		</DialogContent>
	);
}
