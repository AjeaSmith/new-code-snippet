export default function EmptyState({ title, children }) {
	return (
		<div className="text-white">
			<h2 className="text-2xl font-semibold mb-2">{title}</h2>
			<p>
				<span className="flex gap-2 italic text-white/75">{children}</span>{" "}
			</p>
		</div>
	);
}
