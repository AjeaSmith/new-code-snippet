import Snippet from "@/lib/models/snippet.model";
import { connectToDB } from "@/lib/mongoose";

export async function GET(req, { params }) {
	const id = params.id;
	try {
		await connectToDB();
		const snippets = await Snippet.find({ folderId: id })
			.sort({ createdAt: "desc" })
			.lean();

		return Response.json(snippets);
	} catch (error) {
		console.log(error.message);
		return Response.json({ error: "Failed to fetch snippets" });
	}
}
