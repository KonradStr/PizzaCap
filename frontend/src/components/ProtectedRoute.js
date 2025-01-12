import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute =  ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        console.log("redirect");
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;