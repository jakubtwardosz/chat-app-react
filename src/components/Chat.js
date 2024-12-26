import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [chatId, setChatId] = useState(null);
    const [connection, setConnection] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const checkLogin = () => {
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
        if (isLoggedIn) {
            axios.post("https://localhost:7099/api/Chat/GetPaginatedChat", null, {
                params: {
                    chatName: "Global",
                    pageNumber: 1,
                    pageSize: 20
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setChatId(response.data.id);
                    const sortedMessages = response.data.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    setMessages(sortedMessages);
                    initializeSignalR();
                })
                .catch(error => {
                    console.error("Błąd podczas inicjalizacji chatu:", error);
                });
        }
    }, [isLoggedIn]);

    const initializeSignalR = () => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`https://localhost:7099/messageHub?token=${token}`)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        newConnection.on("ReceiveMessage", (user, message, chat) => {
            setMessages(prevMessages => [...prevMessages, { sender: user, messageText: message, chatId: chat, createdAt: new Date() }]);
        });

        newConnection.onclose(error => {
            console.error("SignalR Connection Closed: ", error);
        });

        newConnection.start()
            .then(() => {
                console.log("SignalR Connected");
                setConnection(newConnection);
            })
            .catch(err => console.error("SignalR Connection Error: ", err));
    };

    const handleSend = () => {
        if (input.trim() && connection && chatId) {
            console.log("Sending message:", input);
            connection.invoke("SendMessageToChat", chatId, input)
                .then(() => {
                    setInput('');
                })
                .catch(err => console.error("Błąd podczas wysyłania wiadomości:", err));
        } else {
            console.error("Connection is not established, chatId is missing, or input is empty");
        }
    };

    if (!isLoggedIn) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100 overflow-hidden">
            <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                    <div key={index} className="p-2 mb-2 bg-white rounded shadow">
                        <span>{message.sender}: {message.messageText}</span>
                        <span className="block text-xs text-gray-500">{new Date(message.createdAt).toLocaleTimeString()}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex mt-4 flex-shrink-0">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
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