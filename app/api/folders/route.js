import Folder from "@/lib/models/folder.model";
import { connectToDB } from "@/lib/mongoose";

export async function GET(request, res) {
	try {
		await connectToDB();
		const folders = await Folder.find({}).sort({ createdAt: "desc" }).lean();
		res.setHeader("Cache-Control", "no-store"); // Ensure no caching
		res.status(200).json(folders);
	} catch (error) {
		console.error("Failed to fetch folders", error);
		res.status(500).json({ error: "Failed to fetch folders" });
	}
}
