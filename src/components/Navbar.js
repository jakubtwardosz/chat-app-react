import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
    const [name, setName] = useState("Poorchat");
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
        if (isLoggedIn) {
            axios.post("https://localhost:7099/api/Chat/GetPaginatedChat", null, {
                params: {
                    chatName: "Global",
                    pageNumber: 1,
                    pageSize: 20
                },
                headers: {
                    Authorization: `Bearer ${isLoggedIn}`
                }
            })
            .then(response => {
                setName(response.data.name);
            })
            .catch(error => {
                console.error("Błąd podczas pobierania nazwy:", error);
            });
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
            <h1 className="text-lg font-bold">{name}</h1>

            <div className="flex items-center space-x-4">
                {!isLoggedIn ? (
                    <>
                        <Link to="/login">
                            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
                                Logowanie
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition duration-300">
                                Rejestracja
                            </button>
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition duration-300"
                    >
                        Wyloguj się
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar;