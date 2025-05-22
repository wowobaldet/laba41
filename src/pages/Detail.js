import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Detail.css"; // Импортируем стили

const Detail = () => {
    const { id } = useParams(); // Получаем ID участника из URL
    const navigate = useNavigate();

    // Состояние для хранения данных участника
    const [itemData, setItemData] = useState(null);
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null); // Состояние ошибки

    // Ссылки на поля ввода
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const birthRef = useRef(null);

    // Загрузка данных о участнике
    useEffect(() => {
        async function loadItem() {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/items/${id}`);
                setItemData(response.data); // Преобразование JSON в объект JavaScript
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 404) {
                        setError("404. Страница не найдена.");
                    } else if (status === 500) {
                        setError("500. Внутренняя ошибка сервера. Попробуйте позже.");
                    } else {
                        setError(`Ошибка ${status}. Попробуйте позже.`);
                    }
                } else if (error.request) {
                    setError("Сервер не отвечает. Проверьте подключение к интернету.");
                } else {
                    setError("Произошла ошибка. Попробуйте снова.");
                }
            } finally {
                setLoading(false);
            }
        }

        loadItem();
    }, [id]);

    // Функция обновления участника
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedItem = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            birth: birthRef.current.value,
        };

        axios
            .put(`http://localhost:5000/items/${id}`, JSON.stringify(updatedItem), {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setItemData(response.data); // Обновляем данные в состоянии
                console.log("Обновлённый участник:", response.data);
                navigate("/");
            })
            .catch((error) => {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 400) {
                        setError("Ошибка 400. Некорректные данные. Проверьте введенные значения.");
                    } else if (status === 404) {
                        setError("Ошибка 404. Участник не найден.");
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
            });
    };

    // Отображение спиннера при загрузке
    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div> {/* Спиннер */}
            </div>
        );
    }

    // Отображение ошибки
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // Отображение формы редактирования
    return (
        <div className="detail-container">
            <h1>Редактирование участника</h1>
            <form onSubmit={handleSubmit}>
                {/* Поле для ввода имени */}
                <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        ref={nameRef}
                        defaultValue={itemData ? itemData.name : ""}
                        required
                    />
                </div>

                {/* Поле для ввода email */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        defaultValue={itemData ? itemData.email : ""}
                        required
                    />
                </div>

                {/* Поле для ввода даты рождения */}
                <div className="form-group">
                    <label htmlFor="birth">Дата рождения:</label>
                    <input
                        type="date"
                        id="birth"
                        ref={birthRef}
                        defaultValue={itemData ? itemData.birth : ""}
                        required
                    />
                </div>

                {/* Кнопка отправки формы */}
                <button type="submit" className="submit-button">
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default Detail;