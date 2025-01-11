// Validation functions
export const isCardNumberValid = (number) => {
  // Check if card number is numeric and follows the Luhn algorithm
  const regex = /^[0-9]{13,19}$/; // Common card numbers range from 13 to 19 digits
  if (!regex.test(number)) return false;

  // Implement Luhn Algorithm
  let sum = 0;
  let shouldDouble = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export const isExpirationDateValid = (date) => {
  const [month, year] = date.split('/');
  if (!month || !year || isNaN(month) || isNaN(year)) return false;

  const expiration = new Date(year, month - 1); // Month is zero-based
  const now = new Date();
  return expiration >= now; // Ensure the expiration date is not in the past
};
