export const formatPrice = (price) => {
  return new Intl.NumberFormat('us-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
