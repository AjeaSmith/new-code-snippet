export default function SkeletonUI() {
	return (
		<div className="mt-5 shadow rounded-md p-3 max-w-sm w-full mx-auto">
			<div className="animate-pulse flex space-x-3 items-center">
				<div className="rounded-full bg-slate-700 h-[8px] w-[8px]"></div>
				<div className="flex-1 space-y-6 py-1">
					<div className="h-2 bg-slate-700 rounded"></div>
				</div>
			</div>
		</div>
	);
}
