"use server";

import { revalidatePath } from "next/cache";
import Folder from "../models/folder.model";
import { connectToDB } from "../mongoose";
import { NextResponse } from "next/server";

export const createFolder = async (name) => {
	try {
		await connectToDB();
		const newFolder = new Folder({ name });

		await newFolder.save();
	} catch (error) {
		throw new Error(`Error adding folder ${error.message}`);
	}
};

export const fetchFolders = async () => {
	try {
		await connectToDB();
		const folders = await Folder.find({});

		return folders;
	} catch (error) {
		throw new Error(`Error fetching folders: ${error.message}`);
	}
};

export const fetchFolderById = async (id) => {
	try {
		await connectToDB();

		const folder = await Folder.findById(id);

		if (!folder) throw new Error(`Folder not found`);

		const response = NextResponse.json(folder, { status: 200 });

		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(`Failed to fetch folder ${error.message}`);
	}
};

export const editFolderById = async (id, name) => {
	try {
		connectToDB();

		const updatedFolder = await Folder.findOneAndUpdate({ _id: id }, { name });

		if (!updatedFolder) {
			throw new Error("Folder not found");
		}
	} catch (error) {
		throw new Error(`Failed to edit folder: ${error.message}`);
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
