import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatComponent.css'; // Relative path to the CSS file

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') {
      return;
    }

    const message = {
      text: input,
      isUserMessage: true,
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/chat', {
        input_string: input,
      });

      const answer = response.data.answer;
      const botMessage = {
        text: answer,
        isUserMessage: false,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUserMessage ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={sendMessage}>Send</button>
      </div>
      {isLoading && <div className="loader">Generating response...</div>}
    </div>
  );
};

export default ChatComponent;
