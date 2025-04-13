import axios from 'axios';
import authService from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE_URL}/categories`; 

const getAuthToken = () => {
  const userInfo = authService.getCurrentUser();
  return userInfo?.token;
};

const getAllCategories = async () => {
  const token = getAuthToken();
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || 'Failed to fetch categories'
    );
  }
};

const createCategory = async (categoryData) => {
  const token = getAuthToken();
  if (!token) throw new Error('Not authorized. Please log in.');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    },
  };

  try {
    const response = await axios.post(API_URL, categoryData, config);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || 'Failed to create category'
    );
  }
};

const updateCategory = async (id, categoryData) => {
  const token = getAuthToken();
  if (!token) throw new Error('Not authorized. Please log in.');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.put(`${API_URL}/${id}`, categoryData, config);
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || 'Failed to update category'
    );
  }
};

const deleteCategory = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error('Not authorized. Please log in.');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || 'Failed to delete category'
    );
  }
};

const categoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;