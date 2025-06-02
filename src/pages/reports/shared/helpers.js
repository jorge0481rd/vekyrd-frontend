import { getFromDate } from '../../../utils/getFromDate';

export const dateFormatter = (params) => {
  const date = getFromDate(params.value);
  return `${date.d}/${date.m}/${date.y}`;
};

export const currencyFormatter = (params) => {
  return `$ ${parseFloat(params.value).toFixed(2)}`;
};

export const percentageFormatter = (params) => {
  return `${parseFloat(params.value).toFixed(2)}%`;
};

export function formatCardNumber(cardNumber) {
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
}

export function formattedStrPrice(price) {
  return parseFloat(price).toFixed(2);
}