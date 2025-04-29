import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css"; // Импортируем стили

const Form = () => {
    const nameRef = useRef(null); // Ссылка на поле ввода имени
    const emailRef = useRef(null); // Ссылка на поле ввода email
    const birthRef = useRef(null); // Ссылка на поле ввода даты рождения
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

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
            .catch((error) => console.error("Ошибка создания:", error));
    };

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
                <button type="submit" className="submit-button">
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default Form;