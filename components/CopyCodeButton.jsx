"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "lucide-react";
import { useState } from "react";

export default function CopyCodeButton({ snippetCode }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex gap-3 items-center">
			<CopyToClipboard onCopy={handleCopy} text={snippetCode}>
				<CopyIcon className="text-accent cursor-pointer" />
			</CopyToClipboard>

			{copied && <span className="text-accent text-md">Copied!</span>}
		</div>
	);
}
