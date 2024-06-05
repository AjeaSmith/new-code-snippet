const items = {
	1: ["Item 1", "Item 2", "Item 3"],
	2: ["Item A", "Item B", "Item C"],
	3: ["Item X", "Item Y", "Item Z"],
};

export default function SnippetsPage({ params }) {
	const { folderId } = params;
	const itemList = items[folderId] || ["No items available"];

	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">Items in Note {id}</h2>
			<ul className="list-disc pl-5">
				test
				{itemList.map((item, index) => (
					<li key={index} className="text-gray-700">
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
