import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	language: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	folderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Folder",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// for development, so the model doesn't get redefined everytime on reload
const Snippet =
	mongoose.models.Snippet || mongoose.model("Snippet", snippetSchema);

//Export the model
export default Snippet;
