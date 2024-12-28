import { apiFetchSalesReport } from '../api/api';

export const fetchSalesReport = async (params) => {
  const data = await apiFetchSalesReport(params);
  return data;
};
