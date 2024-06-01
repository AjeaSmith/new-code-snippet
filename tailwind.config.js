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
				"primary-500": "#877EFF",
				"secondary-500": "#FFB620",
				blue: "#0095F6",
				"logout-btn": "#FF5A5A",
				"navbar-menu": "rgba(16, 16, 18, 0.6)",
				"dark-1": "#000000",
				"dark-2": "#121417",
				"dark-3": "#101012",
				"dark-4": "#1F1F22",
				"light-1": "#FFFFFF",
				"light-2": "#EFEFEF",
				"light-3": "#7878A3",
				"light-4": "#5C5C7B",
				"gray-1": "#697C89",
				glassmorphism: "rgba(16, 16, 18, 0.60)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
