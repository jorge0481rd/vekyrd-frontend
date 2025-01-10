import {
  apiFetchInventory_history,
  apiFetchInventoryReport,
  apiFetchPendingOrdersReport,
  apiFetchReviewsReport,
  apiFetchSalesReport,
  apiFetchTopSellingProductsReport,
  apiFetchUsersReport,
} from '../api/api';

export const fetchSalesReport = async (params) => {
  const data = await apiFetchSalesReport(params);
  return data;
};

export const fetchPendingOrdersReport = async (params) => {
  const data = await apiFetchPendingOrdersReport(params);
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

export const fetchTopSellingProductsReport = async ({
  date_start,
  date_end,
  amount_records,
}) => {
  const data = await apiFetchTopSellingProductsReport({
    date_start,
    date_end,
    amount_records,
  });

  return data;
};

export const fetchUsersReport = async (body) => {
  const data = await apiFetchUsersReport(body);
  return data;
};

export const fetchReviewsReport = async () => {
  const data = await apiFetchReviewsReport();
  return data;
};
