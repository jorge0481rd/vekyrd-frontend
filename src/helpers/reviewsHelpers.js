import { apiFetchReviews, apiPostReview } from '../api/api';

export const fetchReviews = async (productId) => {
  try {
    const reviewsData = await apiFetchReviews(productId);
    return reviewsData;
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

// const response = await postReview( { productId, rating, comment });
export const postReview = async (review) => {
  try {
    const response = await apiPostReview(review);
    return response;
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};
