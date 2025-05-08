import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        return <Navigate to="/login" />; // Перенаправление на страницу входа
    }

    return children;
};

export default ProtectedRoute;