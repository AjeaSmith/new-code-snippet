import Folder from "@/lib/models/folder.model";
import { connectToDB } from "@/lib/mongoose";

export async function GET() {
	try {
		await connectToDB();
		const folders = await Folder.find({}).sort({ createdAt: "desc" }).lean()

		return new Response(JSON.stringify(folders), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: "Failed to fetch folders" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
