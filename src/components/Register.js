import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Hasła nie są zgodne.");
            return;
        }

        if (!acceptedTerms) {
            setError("Musisz zaakceptować regulamin i politykę prywatności.");
            return;
        }

        const user = { username, email, password };

        try {
            const response = await axios.post('http://localhost:5256/api/auth/register', user);
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
                        <label className="block text-gray-700">Adres e-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <div>
                        <label className="block text-gray-700">Potwierdź hasło</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="mr-2"
                        />
                        <label className="text-gray-700">
                            Akceptuję <a href="/terms" className="text-blue-500 hover:underline">regulamin</a> i <a href="/privacy" className="text-blue-500 hover:underline">politykę prywatności</a>.
                        </label>
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
