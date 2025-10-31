import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && name) {
      const time = new Date().toLocaleTimeString();
      socket.emit('sendMessage', { name, message, time });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Real-Time Chat</h2>
      {!name ? (
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <>
          <div className="chat-box">
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.name}</strong> [{msg.time}]: {msg.message}
              </p>
            ))}
          </div>
          <form onSubmit={sendMessage} className="chat-form">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
