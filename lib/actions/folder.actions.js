"use server";

import { revalidatePath } from "next/cache";
import Folder from "../models/folder.model";
import { connectToDB } from "../mongoose";

export const createFolder = async (name) => {
	try {
		connectToDB();
		const newFolder = new Folder({ name });

		await newFolder.save();

		revalidatePath("/");
	} catch (error) {
		throw new Error(`Error adding folder ${error.message}`);
	}
};

export const fetchFolders = async () => {
	try {
		connectToDB();
		const folders = await Folder.find({});

		return folders;
	} catch (error) {
		throw new Error(`Error fetching folders: ${error.message}`);
	}
};

export const editFolderById = async ({ id, name }) => {
	try {
		connectToDB();

		const updatedFolder = await Folder.findOneAndUpdate({ _id: id }, { name });

		if (!updatedFolder) {
			throw new Error("Folder not found");
		}

		revalidatePath("/");
	} catch (error) {
		throw new Error(`Failed to edit folder: ${error.message}`);
	}
};

export const deleteFolderById = async (id) => {
	try {
		connectToDB();

		await Folder.findByIdAndDelete(id);
		revalidatePath("/");
	} catch (error) {
		throw new Error(`Failed to delete folder: ${error.message}`);
	}
};
