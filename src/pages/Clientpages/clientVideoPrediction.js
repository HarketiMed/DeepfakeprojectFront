import React, { useState, useRef } from "react";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import "./prediction.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DeepFakePrediction = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [frames, setFrames] = useState([]);
  const [frameDelay, setFrameDelay] = useState(1000); // Default delay of 1 second
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const framesRef = useRef([]); // Use a ref to store frames temporarily

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPrediction(null); // Reset prediction when a new file is uploaded
    setReport(null); // Reset report when a new file is uploaded
    setFrames([]); // Reset frames when a new file is uploaded

    // Reset the video element
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src'); // Remove the source
      videoRef.current.load(); // Reload the video element
    }

    // Reset the frames ref
    framesRef.current = [];
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the file input dialog
  };

  const extractFrames = (video, delay) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      framesRef.current = []; // Reset the ref

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const captureFrame = (time) => {
        video.currentTime = time;
        video.onseeked = () => {
          console.log(`Capturing frame at ${time} seconds`); // Log frame capture
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frameUrl = canvas.toDataURL("image/jpeg");
          framesRef.current.push(frameUrl); // Store frames in the ref

          if (time + delay / 1000 < video.duration) {
            captureFrame(time + delay / 1000);
          } else {
            console.log("All frames extracted:", framesRef.current); // Log all extracted frames
            setFrames(framesRef.current); // Update state for rendering
            resolve(framesRef.current); // Resolve the Promise with the extracted frames
          }
        };
      };

      captureFrame(0); // Start capturing frames from the beginning
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a file first!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setReport(null);

    // If the file is a video, extract frames
    if (file.type.startsWith("video")) {
      try {
        // Extract frames and wait for the process to complete
        const extractedFrames = await extractFrames(videoRef.current, frameDelay);
        console.log("Extracted Frames:", extractedFrames); // Log extracted frames

        // Send each frame to the backend for prediction
        const predictions = await Promise.all(
          extractedFrames.map(async (frame, index) => {
            const formData = new FormData();
            const blob = await fetch(frame).then((res) => res.blob());
            formData.append("file", blob, `frame_${index}.jpg`);

            try {
              console.log(`Sending frame ${index + 1} to backend...`); // Log API request
              const response = await axios.post(
                "http://localhost:8000/prediction/",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log(`Response for frame ${index + 1}:`, response.data); // Log backend response
              return response.data.prediction; // Assuming the response contains a 'prediction' field
            } catch (err) {
              console.error(`Error predicting frame ${index + 1}:`, err); // Log API error
              return "Error";
            }
          })
        );

        // Calculate the percentage of fake frames
        const fakeCount = predictions.filter((pred) => pred === "Fake").length;
        const totalFrames = predictions.length;
        const fakePercentage = ((fakeCount / totalFrames) * 100).toFixed(2);

        // Update the prediction and report
        setPrediction(fakeCount > 0 ? "Fake" : "Real");
        setReport({
          confidence: `${fakePercentage}% fake frames`,
          analysisTime: `${(totalFrames * 0.5).toFixed(2)} seconds`, // Simulated analysis time
          fileType: file.type,
          fileSize: `${(file.size / 1024).toFixed(2)} KB`,
          totalFrames: totalFrames,
          fakeFrames: fakeCount,
        });
      } catch (err) {
        console.error("Error extracting frames:", err);
        setError("An error occurred while extracting frames.");
      }
    } else if (file.type.startsWith("image")) {
      // If the file is an image, send it directly to the backend
      const formData = new FormData();
      formData.append("file", file);

      try {
        console.log("Sending image to backend..."); // Log API request
        const response = await axios.post(
          "http://localhost:8000/prediction/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Backend response:", response.data); // Log backend response
        setPrediction(response.data.prediction);
      } catch (err) {
        console.error("Error predicting image:", err); // Log API error
        setError("An error occurred while processing the image.");
      }
    }

    setIsLoading(false);
  };

  // Confidence Pie Chart
  const ConfidencePieChart = ({ confidence }) => {
    const data = {
      labels: ["Fake Frames", "Real Frames"],
      datasets: [
        {
          data: [confidence, 100 - confidence],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };

    return <Doughnut data={data} />;
  };

  // Fake Frames Bar Chart
  const FakeFramesBarChart = ({ fakeFrames, totalFrames }) => {
    const data = {
      labels: ["Fake Frames", "Real Frames"],
      datasets: [
        {
          label: "Frame Count",
          data: [fakeFrames, totalFrames - fakeFrames],
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return <Bar data={data} options={options} />;
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
            <p>
              <strong>Total Frames:</strong> {report.totalFrames}
            </p>
            <p>
              <strong>Fake Frames:</strong> {report.fakeFrames}
            </p>
          </div>

          <div className="report-visualizations">
            <div className="chart-container">
              <h3>Confidence Distribution</h3>
              <ConfidencePieChart confidence={parseFloat(report.confidence)} />
            </div>

            <div className="chart-container">
              <h3>Fake vs Real Frames</h3>
              <FakeFramesBarChart
                fakeFrames={report.fakeFrames}
                totalFrames={report.totalFrames}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeepFakePrediction;