"use client";
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
	const { addSnippet, selectedSnippet } = useSnippets();

	const form = useForm({
		resolver: zodResolver(SnippetValidation),
		defaultValues: {
			name: type === "edit" ? selectedSnippet.name : "",
			description: type === "edit" ? selectedSnippet.description : "",
			code: type === "edit" ? selectedSnippet.code : "",
			language: type === "edit" ? selectedSnippet.language : "javascript",
		},
	});

	const { isSubmitting } = useFormState({ control: form.control });

	const language = form.watch("language");

	const onSubmit = async (values) => {
		await addSnippet(values, type);

		form.reset();
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
