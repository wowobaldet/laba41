import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/items");
            setData(response.data); // Преобразование JSON в массив JavaScript
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 404) {
                    setError("Список участников не найден.");
                } else if (status === 500) {
                    setError("Внутренняя ошибка сервера. Попробуйте позже.");
                } else {
                    setError(`Ошибка ${status}. Попробуйте позже.`);
                }
            } else if (error.request) {
                setError("Сервер не отвечает. Проверьте подключение к интернету.");
            } else {
                setError("Произошла ошибка. Попробуйте снова.");
            }
        } finally {
            setLoading(false); // Загрузка завершена
        }
    }

    // Функция удаления участника
    const deleteItem = async (id) => {
        if (window.confirm("Вы уверены, что хотите удалить этого участника?")) {
            try {
                await axios.delete(`http://localhost:5000/items/${id}`);
                console.log("Участник успешно удален");
                // Обновляем состояние, удаляя элемент из списка
                setData((prevData) => prevData.filter((item) => item.id !== id));
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 404) {
                        alert("Ошибка 404. Участник не найден.");
                    } else if (status === 500) {
                        alert("Ошибка 500. Внутренняя ошибка сервера. Попробуйте позже.");
                    } else {
                        alert(`Ошибка ${status}. Попробуйте позже.`);
                    }
                } else if (error.request) {
                    alert("Сервер не отвечает. Проверьте подключение к интернету.");
                } else {
                    alert("Произошла ошибка. Попробуйте снова.");
                }
            }
        }
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
        <div className="home-container">
            <h1>Список участников</h1>
            <Link to="/add" className="add-button">
                + Добавить участника
            </Link>
            <ul className="items-list">
                {data.map((item) => (
                    <li key={item.id} className="item">
                        <Link to={`/detail/${item.id}`} className="item-link">
                            {item.name}
                        </Link>
                        <button
                            onClick={() => deleteItem(item.id)}
                            className="delete-button"
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
            <Link to="/login" className="unsigned-button">
                Выйти
            </Link>
        </div>
    );
};

export default Home;