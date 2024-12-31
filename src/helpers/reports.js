import {
  apiFetchInventory_history,
  apiFetchInventoryReport,
  apiFetchSalesReport,
  apiFetchTopSellingProductsReport,
} from '../api/api';

export const fetchSalesReport = async (params) => {
  const data = await apiFetchSalesReport(params);
  return data;
};

export const fetchInventoryReport = async (params) => {
  const response = await apiFetchInventoryReport(params);
  return response.data;
};

export const fetchInventoryHistoryReport = async (params) => {
  const response = await apiFetchInventory_history(params);
  return response.data;
};

export const fetchTopSellingProductsReport = async (body) => {
  const data = await apiFetchTopSellingProductsReport(body);
  return data;
};
