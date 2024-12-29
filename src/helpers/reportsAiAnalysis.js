import { apiFetchCategoriesAnalysis } from '../api/api';

export const fetchCategoriesAnalysis = async (data) => {
  const response = await apiFetchCategoriesAnalysis(data);
  return response.data;
};
