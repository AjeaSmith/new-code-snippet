import NotesPage from "./notes/page";

export default function Home({ params }) {
	console.log(params);
	// this page should show the folder list
	return <NotesPage />;
}
