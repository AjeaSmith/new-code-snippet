import Folder from "@/lib/models/folder.model";
import { connectToDB } from "@/lib/mongoose";

export async function GET() {
	try {
		await connectToDB();
		const folders = await Folder.find({}).sort({ createdAt: "desc" }).lean();
		console.log("Fetched folders:", folders); // Add logging
		return NextResponse.json(folders, {
			status: 200,
			headers: {
				"Cache-Control": "no-store", // Ensure no caching
			},
		});
	} catch (error) {
		console.error("Failed to fetch folders", error);
		return NextResponse.json(
			{ error: "Failed to fetch folders" },
			{ status: 500 }
		);
	}
}
