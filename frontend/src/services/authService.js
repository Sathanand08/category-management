import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API_URL = `${API_BASE_URL}/auth`; 


const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password,
    });
    if (response.data && response.data.token) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || 'Signup failed'
    );
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    
    if (response.data && response.data.token) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || 'Login failed'
    );
  }
};

const logout = () => {
  localStorage.removeItem('userInfo');
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('userInfo'));
  } catch (e) {
    console.error("Could not parse userInfo from localStorage", e);
    return null;
  }
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;