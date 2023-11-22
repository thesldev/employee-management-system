import React, { useState } from 'react';

const FileHandling = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8800/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        alert('File uploaded successfully');
        setSelectedFile(null);
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default FileHandling;
