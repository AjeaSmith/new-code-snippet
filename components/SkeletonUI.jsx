export default function SkeletonUI() {
	return (
		<div class="mt-5 shadow rounded-md p-3 max-w-sm w-full mx-auto">
			<div class="animate-pulse flex space-x-3 items-center">
				<div class="rounded-full bg-slate-700 h-[8px] w-[8px]"></div>
				<div class="flex-1 space-y-6 py-1">
					<div class="h-2 bg-slate-700 rounded"></div>
				</div>
			</div>
		</div>
	);
}
