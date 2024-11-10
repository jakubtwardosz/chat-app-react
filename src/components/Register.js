import React, { useState } from "react";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const user = { username, password };

        try {
            const response = await axios.post('http://localhost:5256/api/auth/register', user);
            setSuccess(response.data);
            setError('');
        } catch (err) {
            setError("Rejestracja nie powiodła się: " + err.response.data);
            setSuccess("");
        }
    }

    return (
        <div>
            <h2>Rejestracja</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Zarejestruj się</button>
            </form>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}
export default Register;