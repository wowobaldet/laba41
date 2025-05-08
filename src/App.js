import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Защищенные маршруты */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add"
                    element={
                        <ProtectedRoute>
                            <Form />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/detail/:id"
                    element={
                        <ProtectedRoute>
                            <Detail />
                        </ProtectedRoute>
                    }
                />

                {/* Маршрут для входа */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;