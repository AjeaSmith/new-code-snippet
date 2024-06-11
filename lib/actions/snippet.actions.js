"use server";

import { revalidatePath } from "next/cache";
import Snippet from "../models/snippet.model";
import { connectToDB } from "../mongoose";

export const createSnippet = async ({
	name,
	description,
	code,
	language,
	folderId,
	pathname,
}) => {
	try {
		connectToDB();
		const newSnippet = new Snippet({
			name,
			description,
			code,
			language,
			folderId,
		});

		await newSnippet.save();

		revalidatePath(pathname);
	} catch (error) {
		throw new Error(`Error adding snippet ${error.message}`);
	}
};

export const fetchSnippetsByFolderId = async (folderId) => {
	try {
		await connectToDB();

		const snippets = await Snippet.find({
			folderId: folderId,
		});

		if (!snippets) throw new Error("No snippets found within that folder");

		return snippets;
	} catch (error) {
		throw new Error(`Error fetching snippets: ${error.message}`);
	}
};

export const fetchSnippetById = async (snippetId) => {
	try {
		connectToDB();

		const snippet = await Snippet.findById(snippetId);

		if (!snippet) throw new Error("Snippet Not found");

		return snippet;
	} catch (error) {
		throw new Error(`Error fetching snippet: ${error.message}`);
	}
};
