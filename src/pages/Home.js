import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/items");
            setData(response.data);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        } finally {
            setLoading(false);
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
                console.error("Ошибка удаления:", error);
                alert("Не удалось удалить участника");
            }
        }
    };

    if (loading) {
        return <div className="loading">Загрузка...</div>;
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
        </div>
    );
};

export default Home;