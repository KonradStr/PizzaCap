import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute =  ({ isAuthenticated, redirectPath }) => {
    if (!isAuthenticated) {
        console.log("redirect", redirectPath);
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;