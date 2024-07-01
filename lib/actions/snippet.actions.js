"use server";

import Snippet from "../models/snippet.model";
import { connectToDB } from "../mongoose";

export const createSnippet = async (
	{ name, description, code, language },
	folderId
) => {
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

		return { snippet: newSnippet };
	} catch (error) {
		console.log("Error adding snippet", error.message);
		throw new Error(`Sorry, there was a error adding snippet. Try again later`);
	}
};

export const editSnippetById = async (snippetId, data) => {
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

		const updatedSnippet = await Snippet.findByIdAndUpdate(
			snippetId,
			updateData,
			{ new: true }
		).lean();
		return {
			updatedSnippet,
		};
	} catch (error) {
		console.log("Failed to edit snippet:", error);
		throw new Error(`Failed to edit snippet, try again later`);
	}
};

export const deleteSnippetById = async (snippetId) => {
	try {
		await connectToDB();
		await Snippet.deleteOne({ _id: snippetId });
	} catch (error) {
		console.log("Error deleting snippet", error.message);
		throw new Error("Failed to delete snippet, try again later");
	}
};
