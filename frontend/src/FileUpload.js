import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [responseString, setResponseString] = useState('');

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    axios.post('http://localhost:8000/api/process-file/', formData)
      .then(response => {
        setResponseString(response.data.result);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div >
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
    {responseString && <div style={{ height: '100px', overflow: 'auto' }}>{responseString}</div>}
  </div>
  );
}

export default FileUpload;
