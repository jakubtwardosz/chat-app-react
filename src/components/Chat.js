import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const checkLogin = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = new Date(decodedToken.exp * 1000);
        if (expirationDate < new Date()) {
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            setIsLoggedIn(true);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, timestamp: new Date() }]);
            setInput('');
        }
    };

    if (!isLoggedIn) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                    <div key={index} className="p-2 mb-2 bg-white rounded shadow">
                        <span>{message.text}</span>
                        <span className="block text-xs text-gray-500">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>

            <div className="flex mt-4 flex-shrink-0">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-l"
                />
                <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-r">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
