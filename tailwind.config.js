/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				accent: "#4444FE",
				folder: "#1E1F21",
				snippet: "#131415",
				"active-snippet": "#0C0C0E",
				"snippet-gray": "#5F5F60",
				"snippet-gray-active": "#9B9C9F",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
