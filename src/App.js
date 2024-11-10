import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';

function App() {
  const [message, setMessage] = useState("");
  
  useEffect(() => {
      fetch("http://localhost:5256/api/hello")
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error(error));
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>
          {message}
        </p>
      </header>
      <Register />
    </div>
  );
}

export default App;
