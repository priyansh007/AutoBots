import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseString, setResponseString] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

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
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
    {responseString && <div style={{ height: '100px', overflow: 'auto' }}>{responseString}</div>}
  </div>
  );
}

export default FileUpload;
