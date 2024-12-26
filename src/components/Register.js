import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                "https://localhost:7099/api/auth/register",
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
            setSuccess("Rejestracja zakończona sukcesem!");
            setError('');
        } catch (err) {
            setError("Rejestracja nie powiodła się: " + (err.response?.data || err.message));
            setSuccess("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Rejestracja</h2>

                <form onSubmit={handleRegister} className="space-y-4">
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
                        Zarejestruj się
                    </button>
                </form>

                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                {success && <p className="mt-4 text-center text-green-500">{success}</p>}

                <p className="mt-4 text-center text-gray-600">
                    Masz już konto?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">Zaloguj się</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
