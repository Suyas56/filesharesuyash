import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const url = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          let response = await uploadFile(data);
          console.log("Full RESPONSE:", response);  // Log the full response object

          // Check if response is an object and has the 'path' property
          if (response && response.path) {
            setResult(response.path);
          } else {
            console.error('Response does not contain path:', response);
            setResult('Error: Invalid response');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          setResult('Error uploading file');
        }
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    console.log(file);
    fileInputRef.current.click();
  };

  return (
    <div className='container'>
      <img src={url} className='img' alt="Uploaded file" />
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>
        
        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {result && <a href={result} target='_blank' rel="noopener noreferrer">{result}</a>} 
      </div>
    </div>
  );
}

export default App;
