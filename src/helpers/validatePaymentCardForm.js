export const validatePaymentCardForm = (cardDetails, setErrorMessage) => {
  const { name, number, expiry, cvc } = cardDetails;

  if (!name || !number || !expiry || !cvc) {
    setErrorMessage('Por favor, complete todos los campos.');
    return false;
  }

  if (!/^\d{16}$/.test(number)) {
    setErrorMessage('El número de tarjeta debe contener 16 dígitos.');
    return false;
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    setErrorMessage('La fecha de vencimiento debe estar en formato MM/YY.');
    return false;
  }

  const [month, year] = expiry.split('/');
  const expiryDate = new Date(`20${year}`, month - 1);
  const currentDate = new Date();
  if (expiryDate < currentDate) {
    setErrorMessage('La tarjeta está vencida.');
    return false;
  }

  if (!/^\d{3,4}$/.test(cvc)) {
    setErrorMessage('El CVV debe contener 3 o 4 dígitos.');
    return false;
  }

  setErrorMessage('');
  return true;
};
