import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const userInfo = authService.getCurrentUser(); // Get user info for display

  const handleLogout = () => {
    authService.logout(); // Clear localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 md:left-64 z-30">
      <div className="relative hidden md:block">
        
        <h1 className="text-3xl font-semibold text-gray-800">Category Management</h1>
        
      </div>

      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 text-sm font-medium hidden sm:block">
            {userInfo?.email || 'Admin'}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;