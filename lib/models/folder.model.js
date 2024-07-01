import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const folderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// for development, so the model doesn't get redefined everytime on reload
const Folder = mongoose.models.Folder || mongoose.model("Folder", folderSchema);

//Export the model
export default Folder;
