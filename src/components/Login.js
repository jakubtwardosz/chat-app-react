import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/chat");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://localhost:7099/api/auth/login",
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            localStorage.setItem("token", response.data.token);
            setSuccess("Zalogowano pomyślnie!");
            setError('');

            navigate('/chat');
        } catch (err) {
            console.error("Wystąpił błąd logowania:" + (err.response?.data || err.message));
            setError("Błąd logowania! Sprawdź dane.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Logowanie</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Nazwa użytkownika</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Hasło</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Zaloguj się
                    </button>
                </form>

                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                {success && <p className="mt-4 text-center text-green-500">{success}</p>}

                <p className="mt-4 text-center text-gray-600">
                    Nie masz jeszcze konta? Zarejestruj się!{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">Zarejestruj się</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
