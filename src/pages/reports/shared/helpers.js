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
