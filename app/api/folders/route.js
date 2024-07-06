import Folder from "@/lib/models/folder.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
	try {
		await connectToDB();
		const folders = await Folder.find({}).sort({ createdAt: "desc" }).lean();
		return NextResponse.json(folders, {
			status: 200,
		});
	} catch (error) {
		console.error("Failed to fetch folders", error);
		return NextResponse.json(
			{ error: "Failed to fetch folders" },
			{ status: 500 }
		);
	}
}
