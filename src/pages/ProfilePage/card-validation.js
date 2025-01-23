export const isCardNumberValid = (number) => {
  const regex = /^[0-9]{13,19}$/; 
  if (!regex.test(number)) return false;

  
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

  const expiration = new Date(year, month - 1); 
  const now = new Date();
  return expiration >= now; 
};
