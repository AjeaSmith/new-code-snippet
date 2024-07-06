export default function SkeletonSnippets() {
	// Define the number of items you want to create
	const numItems = 5; // or any number you need
	// Create an array with that number of elements
	const items = Array.from({ length: numItems });
	return (
		<>
			{items.map((_, i) => {
				return (
					<div key={i} className="rounded-md p-4 max-w-sm w-full mx-auto">
						<div className="animate-pulse flex space-x-4">
							<div className="flex-1 space-y-5 py-1">
								<div className="h-4 w-[150px] bg-folder rounded"></div>

								<div className="h-4 bg-folder rounded"></div>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}
