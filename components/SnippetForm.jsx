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
import { createSnippet, editSnippetById } from "@/lib/actions/snippet.actions";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { LoaderCircleIcon } from "lucide-react";
import {
	DialogHeader,
	DialogTitle,
	DialogContent,
	DialogFooter,
} from "./ui/dialog";

export default function SnippetForm({
	snippet,
	folderId,
	type,
	open,
	setOpen,
}) {
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(SnippetValidation),
		defaultValues: {
			name: snippet ? snippet.name : "",
			description: snippet ? snippet.description : "",
			code: snippet ? snippet.code : "",
			language: snippet ? snippet.language : "javascript",
		},
	});

	const { isSubmitting } = useFormState({ control: form.control });

	const language = form.watch("language");

	const onSubmit = async (values) => {
		if (type === "edit") {
			const { updatedSnippetId } = await editSnippetById(snippet._id, values);

			mutate(
				`snippets|${folderId}`,
				(data) => {
					return data.map((item) =>
						item._id === snippet._id
							? { ...values, _id: updatedSnippetId }
							: item
					);
				},
				false
			);
			// Prefetch the new route
			router.refresh();
		} else {
			const { id } = await createSnippet(values, folderId);
			// Optimistically update the UI
			mutate(
				`snippets|${folderId}`,
				(data) => {
					return [{ ...values, _id: id }, ...data];
				},
				false
			);

			form.reset();

			// Prefetch the new route
			router.prefetch(`/folder/${folderId}/snippet/${id}`);
			router.push(`/folder/${folderId}/snippet/${id}`);
		}
		// Close the modal and reset the form
		setOpen(false);
	};

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					{snippet ? `Editing: ${snippet.name} ` : "Create a snippet"}
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
									{snippet ? "Saving..." : "Creating..."}
								</>
							) : (
								<span>{snippet ? "Save Changes" : "Create"}</span>
							)}
						</Button>
					</DialogFooter>
				</form>
			</FormProvider>
		</DialogContent>
	);
}
