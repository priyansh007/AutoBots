import React from 'react';
import FileUpload from './FileUpload';
import ChatComponent from './ChatComponent';
import './App.css';


function App() {
  return (
    // <div className="App">
      
      <div clsssName="Container">
        <div clsssName="left-div">
          <h1>File Upload</h1>
            <FileUpload />
        </div>

        <div clsssName="right-div">
          {/* <div> */}
            <h1>Chat Demo</h1>
            <ChatComponent />
          {/* </div> */}
        </div>
      </div>
    
    // </div>
  );
}

export default App;
