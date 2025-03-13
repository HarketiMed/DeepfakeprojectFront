import '../styles/prediction.css'

import React, { useState } from 'react';
import axios from 'axios';


const Prediction = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Create a preview URL
      setError(null); // Clear error when a new file is selected
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select an image file.');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/prediction/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Backend Response:', response.data);
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('An error occurred while processing the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-page">
      <div className="prediction-container">
        <h1 className="title">Fake image detector</h1>
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="file-input"
            className="file-input"
          />
          <label htmlFor="file-input" className="file-label">
            {file ? file.name : 'Choose an image file'}
          </label>
          <button onClick={handleSubmit} disabled={loading} className="upload-button">
            {loading ? (
              <div className="spinner"></div>
            ) : (
              'Upload and Predict'
            )}
          </button>
        </div>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        {prediction && (
          <div className="prediction-result">
            <h2>Prediction Result:</h2>
            <p className={`prediction-text ${prediction.toLowerCase()}`}>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;