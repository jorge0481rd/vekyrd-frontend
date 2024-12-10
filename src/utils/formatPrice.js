function formatPrice(number) {
	const roundedNumber = number.toFixed(2); // Always ensure two decimal places
	const formattedNumber = parseFloat(roundedNumber).toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
	return formattedNumber;
}
export default formatPrice;