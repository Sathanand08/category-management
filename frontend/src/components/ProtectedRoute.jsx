import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = () => {
    const userInfo = authService.getCurrentUser(); // Check if user info exists in localStorage

    // Check if userInfo exists and potentially if the token within is still valid
    const isAuthenticated = userInfo && userInfo.token;

    if (!isAuthenticated) {
        // 'replace' prevents the user from going back to the protected route via browser back button
        return <Navigate to="/login" replace />;
    }
    // Outlet is a placeholder for the actual component defined in the route
    return <Outlet />;
};

export default ProtectedRoute;