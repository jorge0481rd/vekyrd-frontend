import axios from 'axios';
import { extractDateStartAndDateEnd } from './helpers';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 400 &&
      error.response?.data?.message === 'Token inválido'
    ) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await axios.post(
          'http://localhost:5000/auth/refresh',
          { refreshToken }
        );

        localStorage.setItem('token', data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// orders

export const apiCreateOrder = async (cart, orderDetails) => {
  try {
    const response = await api.post(
      'http://localhost:5000/orders/createOrder',
      {
        cart,
        orderDetails,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiPayment = async (paymentPayload) => {
  try {
    const response = await api.post(
      'http://localhost:5000/orders/payment',
      paymentPayload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// auth
export const apiLogin = async (username, password) => {
  const response = await api.post('http://localhost:5000/auth/login', {
    username,
    password,
  });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};

export const apiRegister = async (username, email, password) => {
  const response = await api.post('http://localhost:5000/auth/register', {
    username,
    password,
    email,
  });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};

export const apiLogout = async () => {
  await api.post('http://localhost:5000/auth/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  //window.location.href = '/login';
};

// products
export const apiFetchProducts = async () => {
  const response = await api.get('http://localhost:5000/products');
  return response.data;
};

export const getProductDetails = async (productId) => {
  const response = await api.get(`http://localhost:5000/products/${productId}`);
  return response.data;
};

export const apiPostProductImages = async (formData) => {
  console.log('formData', formData);
  try {
    const response = await api.post(
      'http://localhost:5000/products/add-new-product/images',
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const apiCreateProduct = async (productData) => {
  try {
    const response = await api.post(
      'http://localhost:5000/products/add-new-product',
      productData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const apiFetchReviews = async (productId) => {
  const response = await api.get(`http://localhost:5000/reviews/${productId}`);
  return response.data;
};

export const apiPostReview = async (review) => {
  const response = await api.post('http://localhost:5000/reviews', review);
  return response.data;
};

export const apiFetchWishlist = async () => {
  try {
    const response = await api.get(`http://localhost:5000/wishlist`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
  }
};

// wishlist
export const apiAddToWishlist = async (productId) => {
  const response = await api.post(
    `http://localhost:5000/wishlist/${productId}`
  );
  return response.data;
};

export const apiRemoveFromWishlist = async (productId) => {
  const response = await api.delete(
    `http://localhost:5000/wishlist/${productId}`
  );
  return response.data;
};

// inventory
export const apiFetchInventory = async () => {
  const data =
    (await api.get('http://localhost:5000/products/inventory')) || [];
  return data;
};

export const apiUpdateInventory = async (productId, stock, price) => {
  const response = await api.put(
    `http://localhost:5000/products/updateInventory/`,
    { productId, stock, price }
  );
  return response.data;
};

// roles and users
export const apiFetchUsers = async () => {
  const response = await api.get('http://localhost:5000/users/roles');
  return response.data;
};

export const apiFetchOneUser = async () => {
  const response = await api.get(`http://localhost:5000/users/currentUser`);
  return response.data;
};

export const apiUpdateUserProfile = async (updateData) => {
  const response = await api.put(
    `http://localhost:5000/users/updateUserProfile`,
    {
      updateData,
    }
  );
  return response.data;
};

export const apiUpdateUserroles = async (users) => {
  const response = await api.put(`http://localhost:5000/users/roles`, {
    users,
  });
  return response.data;
};

// questionnaire
export const apiPostQuestionnaire = async (responses) => {
  const response = await api.post(`http://localhost:5000/questionnaire`, {
    responses,
  });
  return response.data;
};

// reports
export const apiFetchSalesReport = async (params) => {
  const response = await api.get(`http://localhost:5000/reports/sales`, {
    params,
  });
  return response.data;
};

export const apiFetchPendingOrdersReport = async (params) => {
  const response = await api.get(
    `http://localhost:5000/reports/pending-orders`,
    { params }
  );
  return response.data;
};

export const apiFetchCategoriesAnalysis = async (data) => {
  const response = await api.post(
    `http://localhost:5000/reports/categories-analysis`,
    data
  );
  return response;
};

export const apiFetchInventoryReport = async (params) => {
  const response = await api.get(`http://localhost:5000/reports/inventory`, {
    params,
  });
  return response;
};

export const apiFetchInventory_history = async (params) => {
  const response = await api.get(
    `http://localhost:5000/reports/inventory_history`,
    {
      params,
    }
  );
  return response;
};

export const apiFetchTopSellingProductsReport = async (body) => {
  const { amount_records } = body;
  const { ds, de } = extractDateStartAndDateEnd(body);
  try {
    const response = await api.post(
      `http://localhost:5000/reports/top-selling`,
      { date_start: ds, date_end: de, amount_records }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching top-selling products report:', error);
    throw error;
  }
};

export const apiFetchUsersReport = async (body) => {
  const { ds, de } = extractDateStartAndDateEnd(body);
  try {
    const response = await axios.post(`http://localhost:5000/reports/users`, {
      date_start: ds,
      date_end: de,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users report:', error);
    throw error;
  }
};

export const apiFetchReviewsReport = async () => {
  try {
    const response = await api.get(`http://localhost:5000/reports/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews report:', error);
  }
};

// contact us
export const apiSendContactUs = async (data) => {
  try {
    const response = await api.post(`http://localhost:5000/contactus`, data);
    return response.data;
  } catch (error) {
    console.error('Error sending contact us:', error);
  }
};

export const apiFetchContactUsReport = async () => {
  try {
    const response = await api.get(`http://localhost:5000/contactus`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contact us report:', error);
  }
};

export const apiSetCommentAsRead = async (commentId) => {
  try {
    const response = await api.put(
      `http://localhost:5000/contactus/${commentId}`,
      {
        read: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error setting comment as read:', error);
  }
};

export const apiDeleteComment = async (commentId) => {
  try {
    const response = await api.delete(
      `http://localhost:5000/contactus/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

export default api;
