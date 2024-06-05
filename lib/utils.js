import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const truncateText = (text, maxLength) => {
	if (text.length <= maxLength) {
		return text;
	}
	return text.slice(0, maxLength) + "...";
};
