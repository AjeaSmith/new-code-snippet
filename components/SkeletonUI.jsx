"use client";

export default function SkeletonUI() {
	// Define the number of items you want to create
	const numItems = 5; // or any number you need
	// Create an array with that number of elements
	const items = Array.from({ length: numItems });
	return (
		<>
			{items.map((_, i) => {
				return (
					<div key={i} className="mt-5 rounded-md p-3 max-w-sm w-full mx-auto">
						<div className="animate-pulse flex space-x-3 items-center">
							<div className="rounded-full bg-slate-700 h-[9px] w-[9px]"></div>
							<div className="flex-1 h-4 bg-slate-700 rounded"></div>
						</div>
					</div>
				);
			})}
		</>
	);
}
