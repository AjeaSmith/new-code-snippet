"use server";

import Folder from "../models/folder.model";
import { connectToDB } from "../mongoose";

import { handleError } from "../utils";
import Snippet from "../models/snippet.model";

export const createFolder = async ({ name, color }) => {
	try {
		await connectToDB();

		if (!name) {
			throw new Error("Invalid folder name");
		}

		const newFolder = new Folder({ name, color });

		await newFolder.save();

		return {
			data: {
				_id: String(newFolder._id),
				name: newFolder.name,
				color: newFolder.color,
			},
		};
	} catch (error) {
		handleError(error, "Error adding folder");
	}
};

export const editFolderById = async (id, data) => {
	try {
		await connectToDB();

		if (!data) {
			throw new Error("Invalid folder / color name");
		}

		const updatedFolder = await Folder.findByIdAndUpdate(
			id,
			{ name: data.name, color: data.color },
			{ new: true }
		).lean();

		if (!updatedFolder) {
			throw new Error("Folder not found");
		}
		return {
			updatedData: {
				_id: String(updatedFolder._id),
				name: updatedFolder.name,
				color: updatedFolder.color,
			},
		};
	} catch (error) {
		handleError(error, "Failed to edit folder by ID");
	}
};

export const deleteFolderById = async (id) => {
	try {
		await connectToDB();

		// Find and delete all snippets associated with the folder
		await Snippet.deleteMany({ folderId: id });

		// Delete the folder
		const folderToBeDeleted = await Folder.findByIdAndDelete(id);

		return {
			folder: folderToBeDeleted,
		};
	} catch (error) {
		console.log("Error deleting folder", error.message);
		throw new Error(`There was a problem deleting folder, try again later`);
	}
};
