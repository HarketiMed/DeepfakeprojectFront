import React, { useState, useRef } from "react";
import "./prediction.css";

const DeepFakePrediction = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [frames, setFrames] = useState([]);
  const [frameDelay, setFrameDelay] = useState(1000); // Default delay of 1 second
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPrediction(null); // Reset prediction when a new file is uploaded
    setReport(null); // Reset report when a new file is uploaded
    setFrames([]); // Reset frames when a new file is uploaded
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the file input dialog
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    setIsLoading(true);

    // Extract frames from the video
    extractFrames(videoRef.current, frameDelay);

    // Simulate an API call for deep fake prediction
    setTimeout(() => {
      const fakePrediction = Math.random() > 0.5 ? "Fake" : "Real";
      const confidence = (Math.random() * 100).toFixed(2); // Random confidence level
      const analysisTime = (Math.random() * 5).toFixed(2); // Random analysis time

      setPrediction(fakePrediction);
      setReport({
        confidence: `${confidence}%`,
        analysisTime: `${analysisTime} seconds`,
        fileType: file.type,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      });
      setIsLoading(false);
    }, 2000);
  };

  const extractFrames = (video, delay) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const frames = [];

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const captureFrame = (time) => {
      video.currentTime = time;
      video.onseeked = () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frameUrl = canvas.toDataURL("image/jpeg");
        frames.push(frameUrl);

        if (time + delay / 1000 < video.duration) {
          captureFrame(time + delay / 1000);
        } else {
          setFrames(frames); // Set the extracted frames
        }
      };
    };

    captureFrame(0); // Start capturing frames from the beginning
  };

  return (
    <div className="deepfake-container">
      <h1>Fake Video Prediction</h1>
      <p className="description">
        Upload a video to detect if it is a deep fake or real.
      </p>

      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="file-input"
          ref={fileInputRef}
          style={{ display: "none" }} // Hide the file input
        />
        <button
          type="button"
          className="upload-button"
          onClick={handleUploadClick}
        >
          Upload Video
        </button>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Predict"}
        </button>
      </form>

      {file && (
        <div className="file-preview">
          <h2>Uploaded Video:</h2>
          <video
            ref={videoRef}
            controls
            className="preview-video"
            onLoadedMetadata={() => setFrames([])} // Reset frames when video changes
          >
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the video tag.
          </video>
          <div className="frame-delay-input">
            <label htmlFor="frameDelay">Frame Delay (ms):</label>
            <input
              type="number"
              id="frameDelay"
              value={frameDelay}
              onChange={(e) => setFrameDelay(Number(e.target.value))}
              min="100"
              step="100"
            />
          </div>
        </div>
      )}

      {frames.length > 0 && (
        <div className="frames-preview">
          <h2>Extracted Frames:</h2>
          <div className="frames-grid">
            {frames.map((frame, index) => (
              <img
                key={index}
                src={frame}
                alt={`Frame ${index + 1}`}
                className="frame-image"
              />
            ))}
          </div>
        </div>
      )}

      {prediction && (
        <div className="prediction-result">
          <h2>Prediction Result:</h2>
          <p
            className={`result ${
              prediction === "Fake" ? "fake-text" : "real-text"
            }`}
          >
            {prediction}
          </p>
        </div>
      )}

      {report && (
        <div className="report-section">
          <h2>Analysis Report</h2>
          <div className="report-details">
            <p>
              <strong>Confidence:</strong> {report.confidence}
            </p>
            <p>
              <strong>Analysis Time:</strong> {report.analysisTime}
            </p>
            <p>
              <strong>File Type:</strong> {report.fileType}
            </p>
            <p>
              <strong>File Size:</strong> {report.fileSize}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeepFakePrediction;