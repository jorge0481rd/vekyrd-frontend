export const validatePaymentCardForm = (cardDetails, setErrorMessage) => {
	const { name, number, expiry, cvc } = cardDetails;

	// Check if all fields are filled
	if (!name || !number || !expiry || !cvc) {
		setErrorMessage('Por favor, complete todos los campos.');
		return false;
	}

	// Validate card number: 16 digits
	if (!/^\d{16}$/.test(number)) {
		setErrorMessage('El número de tarjeta debe contener 16 dígitos.');
		return false;
	}

	// Validate expiry date: MM/YY format
	if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
		setErrorMessage('La fecha de vencimiento debe estar en formato MM/YY.');
		return false;
	}

	// Ensure expiry date is not in the past
	const [month, year] = expiry.split('/');
	const expiryDate = new Date(`20${year}`, month - 1); // MM/YY to Date
	const currentDate = new Date();
	if (expiryDate < currentDate) {
		setErrorMessage('La tarjeta está vencida.');
		return false;
	}

	// Validate CVC: 3 or 4 digits (3 for Visa/MasterCard, 4 for AMEX)
	if (!/^\d{3,4}$/.test(cvc)) {
		setErrorMessage('El CVV debe contener 3 o 4 dígitos.');
		return false;
	}

	setErrorMessage('');
	return true;
};