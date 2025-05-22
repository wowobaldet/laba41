import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        // Проверяем статус при монтировании и при изменении localStorage
        const checkAuth = () => {
            const loggedIn = localStorage.getItem("isLoggedIn") === "true";
            setIsAuthenticated(loggedIn);
        };

        checkAuth();

        // Добавляем слушатель событий для отслеживания изменений
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    if (isAuthenticated === null) {
        return null; // или индикатор загрузки
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;