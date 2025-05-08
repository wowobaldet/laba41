import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css"; // Импортируем стили

const Form = () => {
    const nameRef = useRef(null); // Ссылка на поле ввода имени
    const emailRef = useRef(null); // Ссылка на поле ввода email
    const birthRef = useRef(null); // Ссылка на поле ввода даты рождения
    const navigate = useNavigate();
    const [error, setError] = useState(null); // Состояние для ошибок
    const [loading, setLoading] = useState(false); // Состояние загрузки

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Начинаем загрузку

        // Создаем объект с данными из формы
        const newItemData = {
            name: nameRef.current.value, // Значение из поля имени
            email: emailRef.current.value, // Значение из поля email
            birth: birthRef.current.value, // Значение из поля даты рождения
        };

        // Отправляем данные на сервер
        axios
            .post("http://localhost:5000/items", JSON.stringify(newItemData), {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                console.log("Добавленный участник:", response.data);
                navigate("/"); // Переход на главную страницу после успешного добавления
            })
            .catch((error) => {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 400) {
                        setError("Ошибка 400. Некорректные данные. Проверьте введенные значения.");
                    } else if (status === 500) {
                        setError("Ошибка 500. Внутренняя ошибка сервера. Попробуйте позже.");
                    } else {
                        setError(`Ошибка ${status}. Попробуйте позже.`);
                    }
                } else if (error.request) {
                    setError("Сервер не отвечает. Проверьте подключение к интернету.");
                } else {
                    setError("Произошла ошибка. Попробуйте снова.");
                }
            })
            .finally(() => {
                setLoading(false); // Загрузка завершена
            });
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div> {/* Спиннер */}
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="form-container">
            <h1>Добавление участника</h1>
            <form onSubmit={handleSubmit}>
                {/* Поле для ввода имени */}
                <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input type="text" id="name" ref={nameRef} required />
                </div>

                {/* Поле для ввода email */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" ref={emailRef} required />
                </div>

                {/* Поле для ввода даты рождения */}
                <div className="form-group">
                    <label htmlFor="birth">Дата рождения:</label>
                    <input type="date" id="birth" ref={birthRef} required />
                </div>

                {/* Кнопка отправки формы */}
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? "Добавление..." : "Добавить"}
                </button>

                {/* Отображение ошибки */}
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default Form;