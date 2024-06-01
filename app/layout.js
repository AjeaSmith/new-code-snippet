import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "CodeSnipHub: Your Ultimate Code Snippet Repository",
	description:
		"Discover and share code snippets effortlessly with our Next.js-powered web app. Whether you're a developer looking for quick coding solutions, a student seeking learning resources, or a professional sharing best practices, our platform offers a seamless experience. Access a vast collection of snippets across various languages and frameworks, save your favorites, and contribute your own snippets to the community. Enjoy fast, intuitive, and organized code browsing with advanced search features and user-friendly interface",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="h-screen flex font-sans">
				{/* Notes Sidebar */}
				<aside className="w-1/5 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
					<h1 className="text-3xl font-bold mb-6">Notes</h1>
					<nav>
						<ul>
							<li className="p-4 hover:bg-gray-200 cursor-pointer rounded-md">
								<a href="/notes/1">Note 1</a>
							</li>
							<li className="p-4 hover:bg-gray-200 cursor-pointer rounded-md">
								<a href="/notes/2">Note 2</a>
							</li>
							<li className="p-4 hover:bg-gray-200 cursor-pointer rounded-md">
								<a href="/notes/3">Note 3</a>
							</li>
						</ul>
					</nav>
				</aside>

				{/* Items Sidebar (conditionally rendered) */}
				<aside className="w-1/5 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
					<nav>
						{/* This section will be dynamically updated based on the selected note */}
						<h1 className="text-3xl font-bold mb-6">Items</h1>
						<ul>
							<li className="p-4 hover:bg-gray-200 cursor-pointer rounded-md">
								<a href="/notes/1/items/1">Item 1</a>
							</li>
							<li className="p-4 hover:bg-gray-200 cursor-pointer rounded-md">
								<a href="/notes/1/items/2">Item 2</a>
							</li>
							<li className="p-4 hover:bg-gray-200 cursor-pointer rounded-md">
								<a href="/notes/1/items/3">Item 3</a>
							</li>
						</ul>
					</nav>
				</aside>

				{/* Main Content */}
				<main className="w-3/5 p-6 overflow-y-auto">{children}</main>
			</body>
		</html>
	);
}
