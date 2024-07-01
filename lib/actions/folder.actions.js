"use server";

import Folder from "../models/folder.model";
import { connectToDB } from "../mongoose";
import { NextResponse } from "next/server";
import { handleError } from "../utils";
import Snippet from "../models/snippet.model";


export const createFolder = async (name) => {
	try {
		await connectToDB();

		if (!name) {
			throw new Error("Invalid folder name");
		}

		const newFolder = new Folder({ name });

		await newFolder.save();

		return {
			folder: newFolder,
		};
	} catch (error) {
		handleError(error, "Error adding folder");
	}
};

export const editFolderById = async (id, name) => {
	try {
		await connectToDB();

		if (!name) {
			throw new Error("Invalid folder name");
		}

		const updatedFolder = await Folder.findByIdAndUpdate(
			id,
			{ name },
			{ new: true }
		).lean();

		if (!updatedFolder) {
			throw new Error("Folder not found");
		}
		const response = NextResponse.json(updatedFolder, { status: 200 });
		const data = await response.json();

		return data;
	} catch (error) {
		handleError(error, "Failed to edit folder by ID");
	}
};

export const deleteFolderById = async (id) => {
	try {
		await connectToDB()
		
		// Find and delete all snippets associated with the folder
		await Snippet.deleteMany({ folderId: id });

		// Delete the folder
		await Folder.findByIdAndDelete(id);
	} catch (error) {
		console.log("Error deleting folder", error.message);
		throw new Error(`There was a problem deleting folder, try again later`);
	}
};
