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
		connectToDB();
		const newSnippet = new Snippet({ name });

		await newSnippet.save();

		revalidatePath(pathname);
	} catch (error) {
		throw new Error(`Error adding snippet ${error.message}`);
	}
};
