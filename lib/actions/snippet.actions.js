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
}) => {
	try {
		await connectToDB();
		const newSnippet = new Snippet({
			name,
			description,
			code,
			language,
			folderId,
		});

		await newSnippet.save();

		revalidatePath(`/folder/${folderId}`);
	} catch (error) {
		throw new Error(`Error adding snippet ${error.message}`);
	}
};

export const fetchSnippetsByFolderId = async (folderId) => {
	try {
		connectToDB();

		const snippets = await Snippet.find({
			folderId: folderId,
		}).sort({ createdAt: "desc" });

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

export const editSnippetById = async (snippetId, folderId, data) => {
	try {
		connectToDB();

		const snippet = await Snippet.findById(snippetId);

		if (!snippet) {
			throw new Error(`Snippet with ID ${snippetId} not found`);
		}

		const updateData = {
			name: data.name ? data.name : snippet.name,
			description: data.description ? data.description : snippet.description,
			language: data.language ? data.language : snippet.language,
			code: data.code ? data.code : snippet.code,
		};

		await Snippet.findByIdAndUpdate(snippetId, updateData);
		revalidatePath(`/`);
	} catch (error) {
		throw new Error(`Failed to edit snippet: ${error.message}`);
	}
};

export const deleteSnippetById = async (snippetId) => {
	try {
		await connectToDB();
		await Snippet.deleteOne({ _id: snippetId });
	} catch (error) {
		throw new Error(`Failed to delete snippet: ${error.message}`);
	}
};
