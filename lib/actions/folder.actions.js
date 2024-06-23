"use server";

import { revalidatePath } from "next/cache";
import Folder from "../models/folder.model";
import { connectToDB } from "../mongoose";
import { NextResponse } from "next/server";
import { handleError } from "../utils";

const connectAndCatch = async () => {
	try {
		await connectToDB();
	} catch (error) {
		throw new Error("Database connection failed: " + error.message);
	}
};

export const createFolder = async (name) => {
	try {
		await connectAndCatch();

		if (!name) {
			throw new Error("Invalid folder name");
		}

		const newFolder = new Folder({ name });

		await newFolder.save();
	} catch (error) {
		handleError(error, "Error adding folder");
	}
};

export const fetchFolders = async () => {
	try {
		await connectAndCatch();
		const folders = await Folder.find({});

		return folders;
	} catch (error) {
		handleError(error, "Failed to fetch folders");
	}
};

export const fetchFolderById = async (id) => {
	try {
		await connectAndCatch();

		const folder = await Folder.findById(id);

		if (!folder) throw new Error(`Folder not found`);

		const response = NextResponse.json(folder, { status: 200 });

		const data = await response.json();

		return data;
	} catch (error) {
		handleError(error, "Failed to fetch folder by ID");
	}
};

export const editFolderById = async (id, name) => {
	try {
		await connectAndCatch();

		if (!name) {
			throw new Error("Invalid folder name");
		}

		const updatedFolder = await Folder.findByIdAndUpdate(
			id,
			{ name },
			{ new: true }
		);

		if (!updatedFolder) {
			throw new Error("Folder not found");
		}
	} catch (error) {
		handleError(error, "Failed to edit folder by ID");
	}
};

export const deleteFolderById = async (id) => {
	try {
		// Find and delete all snippets associated with the folder
		// await Snippet.deleteMany({ folderId: id });

		// Delete the folder
		await Folder.findByIdAndDelete(id);
		revalidatePath("/");
	} catch (error) {
		throw new Error(`Failed to delete folder: ${error.message}`);
	}
};
