import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Chat from './components/Chat';

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/chat" : "/login"} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
