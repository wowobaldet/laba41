import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Простая проверка логина и пароля
        if (username === "admin" && password === "password") {
            // Сохраняем статус авторизации в localStorage
            localStorage.setItem("isLoggedIn", "true");
            navigate("/"); // Переход на главную страницу
        } else {
            setError("Неверный логин или пароль.");
        }
    };

    return (
        <div className="login-container">
            <h1>Вход</h1>
            <form onSubmit={handleSubmit}>
                {/* Поле для ввода логина */}
                <div className="form-group">
                    <label htmlFor="username">Логин:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                {/* Поле для ввода пароля */}
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Кнопка отправки формы */}
                <button type="submit" className="submit-button">
                    Войти
                </button>

                {/* Отображение ошибки */}
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default Login;