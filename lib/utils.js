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

export const handleError = (error, message) => {
	// Log the original error for debugging purposes
	console.error(`Original error: ${error.message}`);

	// Throw a new error with a custom message
	throw new Error(`${message}: ${error.message}`);
};
