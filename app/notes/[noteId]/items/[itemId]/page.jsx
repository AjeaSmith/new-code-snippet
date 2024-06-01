const items = {
	1: {
		1: "Details of Item 1 in Note 1",
		2: "Details of Item 2 in Note 1",
		3: "Details of Item 3 in Note 1",
	},
	2: {
		A: "Details of Item A in Note 2",
		B: "Details of Item B in Note 2",
		C: "Details of Item C in Note 2",
	},
	3: {
		X: "Details of Item X in Note 3",
		Y: "Details of Item Y in Note 3",
		Z: "Details of Item Z in Note 3",
	},
};

export default function ItemDetailPage({ params }) {
	const { noteId, itemId } = params;
    console.log(params)
	const itemDetail = items[noteId][itemId] || "Item not found";

	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">
				Item {itemId} in Note {noteId}
			</h2>
			<p className="text-gray-700">{itemDetail}</p>
		</div>
	);
}
