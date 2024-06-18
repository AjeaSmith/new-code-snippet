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
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "./ui/button";
import { languages } from "@/lib/constants";
import CodeEditor from "./AceEditor";
import { createSnippet, editSnippetById } from "@/lib/actions/snippet.actions";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { CircleEllipsisIcon, LoaderCircleIcon } from "lucide-react";

export default function SnippetForm({ snippet, folderId }) {
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
		if (snippet) {
			await editSnippetById(snippet._id, folderId, values);
			router.push(`/folder/${folderId}/snippet/${snippet._id}`);
		} else {
			await createSnippet({ ...values, folderId: folderId });
			router.push(`/folder/${folderId}`);
		}

		mutate(`snippets|${folderId}`);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{snippet ? `Editing: ${snippet.name} ` : "Create a snippet"}
				</CardTitle>
			</CardHeader>
			<CardContent>
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
						<CardFooter className="flex justify-end">
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
						</CardFooter>
					</form>
				</FormProvider>
			</CardContent>
		</Card>
	);
}
