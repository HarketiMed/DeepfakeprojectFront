import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import Prediction from './pages/prediction';
import Dashboard from './pages/Clientpages/clientDashboard';
import { CircularProgress } from '@mui/material'; // For a loading spinner
import RegistrationForm from './pages/Clientpages/clientRegister'
import BusinessForm from './pages/Businesspages/BusinessRegister'
import ImagePrediction from './pages/Clientpages/clientImagePredicition'
function App() {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Simulate loading for 3 seconds (replace with actual data fetching or initialization logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 3 seconds
    }, 4000); // 3-second delay

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Loading Screen Component
  const LoadingScreen = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212', // Match your app's theme
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img
          src="logo.png" // Replace with your logo path
          alt="Logo"
          style={{ width: '150px', marginBottom: '20px' }} // Adjust size as needed
        />
        <CircularProgress sx={{ color: '#2196F3' }} /> {/* Blue spinner */}
      </div>
    </div>
  );

  // Render the loading screen if isLoading is true
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/detection" element={<Prediction />} />
          <Route path="/clientDashboard" element={<Dashboard />} />
          <Route path="/register/client" element={<RegistrationForm  />} />
          <Route path="/register/business" element={<BusinessForm  />} />
          <Route path="/clientImagePrediction" element={<ImagePrediction  />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;