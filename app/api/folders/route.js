import Folder from "@/lib/models/folder.model";
import { connectToDB } from "@/lib/mongoose";

export async function GET() {
	try {
		await connectToDB();
		const folders = await Folder.find({})
			.sort({ createdAt: "desc" })
			.lean();

		return Response.json(folders);
	} catch (error) {
		return Response.json({ error: "Failed to fetch folders" });
	}
}
