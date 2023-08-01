import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Grid from '@mui/material/Grid';
import './App.css';

import logo from './assets/hh.png'; // Import the image file

// import './MontserratFont.css';


const BotResponse = ({ message }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText((prevText) => prevText + message[currentIndex]);
      currentIndex++;

      if (currentIndex === message.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <Typography variant="body1" className="message-text">
      {displayText}
    </Typography>
  );
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const chatEndRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') {
      return;
    }

    const userMessage = {
      text: input,
      isUserMessage: true,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
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

  const addFiles = (event) => {
    setFiles([...event.target.files]);
    handleFileChange(event);
  };

  useEffect(() => {
    if (files.length > 0) {
      handleFileChange();
    }
  }, [files]);


  const handleFileChange = () => {
    const formData = new FormData();
  
    files.forEach((file) => {
      formData.append('files', file);
    });
  
    axios
      .post('http://localhost:8000/api/process-file/', formData)
      .then((response) => {
        const result = response.data.result;
        const botMessage = {
          text: result,
          isUserMessage: false,
        };
        setContent(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  
    // Update the state using functional update
    setUploadedFileName((prevUploadedFiles) => [
      ...prevUploadedFiles,
      ...Array.from(files).map((file) => file.name),
    ]);
  };
  
  
  

  return (
    <div className="app-container">
      {/* File Upload Section */}
      {/* <header className="app-header">
        <Typography variant="h5" className="app-title">
          Autobots
        </Typography>
      </header> */}
 <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap"
        rel="stylesheet"
      />
<Box
  className="app-header"
  bgcolor="#2a2c35"
  color="#ffffff"
  boxShadow="0 2px 8px rgba(0, 0, 0, 0.3)"
>
  {/* Logo Section */}
  <Grid item>
    <img
      src={logo}
      alt="Logo"
      className="app-logo"
      style={{ width: '80px', height: '80px', objectFit: 'contain' }}
    />
  </Grid>
  {/* Title Section */}
  <Grid item>
    <Typography variant="h5" className="app-title">
      Autobots
    </Typography>
  </Grid>
</Box>

      {/* <Grid container justifyContent="center" className="app-header">
        <Typography variant="h5" className="app-title">
          Autobots
        </Typography>
      </Grid> */}


      <div className="file-upload-container">
         {/* Replace the input element with the customized button */}
  <label htmlFor="file-upload">
    <input
      id="file-upload"
      type="file"
      style={{ display: 'none' }} // Hide the original file input element
      onChange={addFiles}
      multiple 
    />

<div>
            {uploadedFileName.map((name, index) => (
              <Typography
                key={index}
                variant="body2"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '8px',
                  padding: '4px 8px',
                  margin: '4px',
                  display: 'inline-block',
                }}
              >
                {name}
              </Typography>
            ))}
          </div>


      {/* {uploadedFileName && <p>Uploaded file: {uploadedFileName}</p>} */}

    <Button
      variant="contained"
      color="primary"
      component="span"
      startIcon={<CloudUploadIcon />} // Add the CloudUploadIcon as the startIcon
    >
      Choose File
    </Button>
  </label>
      </div>

      {/* Chatbot Section */}
      <div className="chatbot-section">
        <Paper elevation={3} className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUserMessage ? 'user-message' : 'bot-message'}`}
            >
              {message.isUserMessage ? (
                <Typography variant="body1" className="message-text">
                  {message.text}
                </Typography>
              ) : (
                <BotResponse message={message.text} />
              )}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </Paper>
        
        <div className="chat-input">
  <div className="input-container">
    <TextField
      label="Type your message..."
      variant="outlined"
      value={input}
      onChange={handleInputChange}
      fullWidth // Add this fullWidth prop to make the TextField take up full width
      InputProps={{
        style: {
          borderRadius: '9px', // Adjust the border radius as needed
        },
      }}
    />
    <Button variant="contained" color="primary" onClick={sendMessage}>
      Send
    </Button>
  </div>
  {isLoading && (
    <div className="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )}
</div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <Typography variant="body2" className="app-footer-text">
          Powered by React and Django
        </Typography>
      </footer>
    </div>
  );
};

export default App;