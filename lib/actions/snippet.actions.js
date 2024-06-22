"use server";

import { revalidatePath } from "next/cache";
import Snippet from "../models/snippet.model";
import { connectToDB } from "../mongoose";
import { redirect } from "next/navigation";

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

		return { id: newSnippet._id };
		// revalidatePath(`/folder/${f olderId}`);
	} catch (error) {
		throw new Error(`Error adding snippet ${error.message}`);
	}
};

// export const fetchSnippetsByFolderId = async (folderId) => {
// 	try {
// 		connectToDB();

// 		const snippets = await Snippet.find({
// 			folderId: folderId,
// 		})
// 			.sort({ createdAt: "desc" })
// 			.lean();

// 		if (!snippets) throw new Error("No snippets found within that folder");

// 		return snippets.map((snippet) => ({
// 			...snippet,
// 			_id: snippet._id.toString(),
// 			folderId: snippet.folderId.toString(),
// 			createdAt: snippet.createdAt.toISOString(),
// 		}));
// 	} catch (error) {
// 		throw new Error(`Error fetching snippets: ${error.message}`);
// 	}
// };
export const fetchSnippetsByFolderId = async (
	folderId,
	page = 1,
	limit = 10
) => {
	try {
		await connectToDB();
		const snippets = await Snippet.find({ folderId })
			.sort({ createdAt: "desc" })
			.skip((page - 1) * limit)
			.limit(limit);

		return snippets;
	} catch (error) {
		throw new Error(`Error fetching snippets: ${error.message}`);
	}
};

export const fetchSnippetById = async (snippetId) => {
	try {
		connectToDB();

		const snippet = await Snippet.findById(snippetId).lean();

		if (!snippet) throw new Error("Snippet Not found");

		return {
			...snippet,
			_id: snippet._id.toString(),
			folderId: snippet.folderId.toString(),
			createdAt: snippet.createdAt.toISOString(),
		};
	} catch (error) {
		throw new Error(`Error fetching snippet: ${error.message}`);
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
			updateData
		);
		return {
			updatedSnippetId: updatedSnippet._id,
		};
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
