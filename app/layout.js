import "./globals.css";
import FolderList from "@/components/FolderList";
import SnippetList from "@/components/SnippetList";
import Head from "next/head";

export const metadata = {
	title: "CodeSnipHub: Your Ultimate Code Snippet Repository",
	description:
		"Discover and share code snippets effortlessly with our Next.js-powered web app. Whether you're a developer looking for quick coding solutions, a student seeking learning resources, or a professional sharing best practices, our platform offers a seamless experience. Access a vast collection of snippets across various languages and frameworks, save your favorites, and contribute your own snippets to the community. Enjoy fast, intuitive, and organized code browsing with advanced search features and user-friendly interface",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className={`h-screen flex`}>
				<FolderList />
				<SnippetList />
				<main className="w-3/5 p-6 | bg-snippet | overflow-y-auto">
					{children}
				</main>
			</body>
		</html>
	);
}
