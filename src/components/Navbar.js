import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
            <h1 className="text-lg font-bold">Poorchat</h1>

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
