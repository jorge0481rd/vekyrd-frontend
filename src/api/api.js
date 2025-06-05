import axios from 'axios';
import { extractDateStartAndDateEnd } from './helpers';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: BASE_URL
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
					`${BASE_URL}/auth/refresh`,
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
			`${BASE_URL}/orders/createOrder`,
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
			`${BASE_URL}/orders/payment`,
			paymentPayload
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// auth
export const apiLogin = async (username, password) => {
	const response = await api.post(`${BASE_URL}/auth/login`, {
		username,
		password,
	});
	localStorage.setItem('token', response.data.token);
	localStorage.setItem('refreshToken', response.data.refreshToken);
	return response.data;
};

export const apiRegister = async (username, email, password) => {
	const response = await api.post(`${BASE_URL}/auth/register`, {
		username,
		password,
		email,
	});
	localStorage.setItem('token', response.data.token);
	localStorage.setItem('refreshToken', response.data.refreshToken);
	return response.data;
};

export const apiLogout = async () => {
	await api.post(`${BASE_URL}/auth/logout`);
	localStorage.removeItem('token');
	localStorage.removeItem('refreshToken');
	//window.location.href = '/login';
};

// products
export const apiFetchProducts = async () => {
	const response = await api.get(`${BASE_URL}/products`);
	return response.data;
};

export const getProductDetails = async (productId) => {
	const response = await api.get(`${BASE_URL}/products/${productId}`);
	return response.data;
};

export const uploadProductImages = async (files, sku) => {
	const formData = new FormData();
	files.forEach((file) => {
		formData.append('images', file);
	});

	const res = await api.post(
		`${BASE_URL}/images/upload-product-image/${sku}`,
		formData
	);

	console.log(res);
};


export const apiCreateProduct = async (productData) => {
	1
	try {
		const response = await api.post(
			`${BASE_URL}/products/add-new-product`,
			productData
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const apiChangeActiveStatus = async (productId, newStatus) => {
	const response = await api.put(
		`${BASE_URL}/products/changeActiveStatus/${productId}?newStatus=${newStatus}`
	);
	return response.data;
};

export const apiFetchReviews = async (productId) => {
	const response = await api.get(`${BASE_URL}/reviews/${productId}`);
	return response.data;
};

export const apiPostReview = async (review) => {
	const response = await api.post(`${BASE_URL}/reviews`, review);
	return response.data;
};

export const apiFetchWishlist = async () => {
	try {
		const response = await api.get(`${BASE_URL}/wishlist`);
		return response.data;
	} catch (error) {
		console.error('Error fetching wishlist:', error);
	}
};

export const apiFetchCartByOrder = async (orderHash) => {
	try {
		const response = await api.get(`${BASE_URL}/cart/${orderHash}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching products by order:', error);
	}
};

// wishlist
export const apiAddToWishlist = async (productId) => {
	const response = await api.post(
		`${BASE_URL}/wishlist/${productId}`
	);
	return response.data;
};

export const apiRemoveFromWishlist = async (productId) => {
	const response = await api.delete(
		`${BASE_URL}/wishlist/${productId}`
	);
	return response.data;
};

// inventory
export const apiFetchInventory = async () => {
	const data =
		(await api.get(`${BASE_URL}/products/inventory`)) || [];
	return data;
};

export const apiUpdateInventory = async (productId, stock, price) => {
	const response = await api.put(
		`${BASE_URL}/products/updateInventory/`,
		{ productId, stock, price }
	);
	return response.data;
};

// roles and users
export const apiFetchUsers = async () => {
	const response = await api.get(`${BASE_URL}/users/roles`);
	return response.data;
};

export const apiFetchOneUser = async () => {
	const response = await api.get(`${BASE_URL}/users/currentUser`);
	return response.data;
};

export const apiFetchUserOrders = async () => {
	const response = await api.get(`${BASE_URL}/orders/userOrders`);
	return response.data;
};

export const apiUpdateUserProfile = async (updateData) => {
	const response = await api.put(
		`${BASE_URL}/users/updateUserProfile`,
		{
			updateData,
		}
	);
	return response.data;
};

export const apiUpdateUserroles = async (users) => {
	const response = await api.put(`${BASE_URL}/users/roles`, {
		users,
	});
	return response.data;
};

export const apiGetCreditCard = async () => {
	const response = await api.get(`${BASE_URL}/users/getCreditCard`);
	return response.data;
};

export const apiCreateCreditCard = async (creditcardInfo) => {
	const response = await api.post(`${BASE_URL}/users/createCreditCard`, {
		...creditcardInfo,
	});
	return response.data;
};

export const apiRemoveCreditCard = async () => {
	const response = await api.delete(`${BASE_URL}/users/removeCreditCard`);
	return response.data;
};

// questionnaire
export const apiPostQuestionnaire = async (responses) => {
	const response = await api.post(`${BASE_URL}/questionnaire`, {
		responses,
	});
	return response.data;
};

// reports
export const apiFetchSalesReport = async (params) => {
	const response = await api.get(`${BASE_URL}/reports/sales`, {
		params,
	});
	return response.data;
};

export const apiFetchPendingOrdersReport = async (params) => {
	const response = await api.get(
		`${BASE_URL}/reports/pending-orders`,
		{ params }
	);
	return response.data;
};

export const apiFetchCategoriesAnalysis = async (data) => {
	const response = await api.post(
		`${BASE_URL}/reports/categories-analysis`,
		data
	);
	return response;
};

export const apiFetchInventoryReport = async (params) => {
	const response = await api.get(`${BASE_URL}/reports/inventory`, {
		params,
	});
	return response;
};

export const apiFetchInventory_history = async (params) => {
	const response = await api.get(
		`${BASE_URL}/reports/inventory_history`,
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
			`${BASE_URL}/reports/top-selling`,
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
		const response = await axios.post(`${BASE_URL}/reports/users`, {
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
		const response = await api.get(`${BASE_URL}/reports/reviews`);
		return response.data;
	} catch (error) {
		console.error('Error fetching reviews report:', error);
	}
};

// contact us
export const apiSendContactUs = async (data) => {
	try {
		const response = await api.post(`${BASE_URL}/contactus`, data);
		return response.data;
	} catch (error) {
		console.error('Error sending contact us:', error);
	}
};

export const apiFetchContactUsReport = async () => {
	try {
		const response = await api.get(`${BASE_URL}/contactus`);
		return response.data;
	} catch (error) {
		console.error('Error fetching contact us report:', error);
	}
};

export const apiSetCommentAsRead = async (commentId) => {
	try {
		const response = await api.put(
			`${BASE_URL}/contactus/${commentId}`,
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
			`${BASE_URL}/contactus/${commentId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting comment:', error);
	}
};

export default api;
