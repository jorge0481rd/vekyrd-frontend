export const getRandomColor = () => {
	const COLORS = [
		'#003547',
		'#C2BB00',
		'#E1523D',
		'#ED8B16',
		'#103778',
		'#0593A2',
		'#fe98ef',
	];
	const randomIndex = Math.floor(Math.random() * COLORS.length);
	return COLORS[randomIndex];
};

export function hexToRGBA(hex, alpha = 0.5) {
	// Remove the hash if it exists
	hex = hex.replace(/^#/, '');

	// Parse r, g, b
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	// Return as rgba string
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// create a function that receives a string and returns a random color. make sure that they are soft pastel colors always
export function getRandomColorFromString(str) {
	// Define an array of soft pastel colors
	const softColors = [
		'#FFB3BA', // Light Pink
		'#FFDFBA', // Light Peach
		'#FFFFBA', // Light Yellow
		'#BAFFC9', // Light Mint
		'#BAE1FF', // Light Blue
		'#FFBAFF', // Light Lavender
		'#D1BAFF', // Light Purple
		'#FFDCBA', // Soft Orange
		'#B3FFBA', // Light Green
		'#E2E2E2', // Soft Gray
		'#F6D8AE', // Soft Yellow
		'#B2F1E6', // Soft Aqua
		'#F1A7B6', // Soft Rose
		'#D7FFB3', // Soft Lime
		'#FF9E9E', // Soft Red
	];

	if (!str) return softColors[0];

	// Use the string's length to ensure that the color is consistently chosen based on the input
	const index = Math.abs(str.length) % softColors.length;

	// Return the selected color based on the string's length
	return softColors[index];
}
