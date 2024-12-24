import axios from 'axios';

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

export const apiCreateOrder = async () => {
  const response = await api.get('http://localhost:5000/orders/createOrder');
  return response.data;
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
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

// cart
export const apiUpdateCart = async (items) => {
  const response = await api.post(
    'http://localhost:5000/orders/updatecart',
    items
  );
  return response.data;
};

export const apiAddToCart = async (productId, quantity) => {
  const response = await api.post('http://localhost:5000/cart/add', {
    product_id: productId,
    quantity: quantity,
  });
  return response.data;
};

// products
export const apiFetchProducts = async () => {
  const response = (await api.get('http://localhost:5000/products')) || [];
  return response.data;
};

export const getProductDetails = async (productId) => {
  const response = await api.get(`http://localhost:5000/products/${productId}`);
  return response.data;
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
  const response = await api.get(`http://localhost:5000/products/wishlist`);
  return response.data;
};

// wishlist
export const apiAddToWishlist = async (productId) => {
  const response = await api.post(
    `http://localhost:5000/products/wishlist/${productId}`
  );
  return response.data;
};

export const apiRemoveFromWishlist = async (productId) => {
  const response = await api.delete(
    `http://localhost:5000/products/wishlist/${productId}`
  );
  return response.data;
};

// inventory
export const apiFetchInventory = async () => {
  const data =
    (await api.get('http://localhost:5000/products/inventory')) || [];
  return data;
};

export const updateInventory = async (productId, quantity) => {
  const response = await api.put(
    `http://localhost:5000/products/updateInventory/${productId}`,
    { quantity }
  );
  return response.data;
};

// roles and users
export const apiFetchUsers = async () => {
  const response = await api.get('http://localhost:5000/users/roles');
  return response.data;
};

export const apiUpdateUserroles = async (users) => {
  const response = await api.put(`http://localhost:5000/users/roles`, {
    users,
  });
  return response.data;
};

export default api;
