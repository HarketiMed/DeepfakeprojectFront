import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

// Import logos (replace with your actual logo paths)

import userFriendlyLogo from '../assets/4946408.png';

import realTimeLogo from '../assets/real-time-analysis-1-478245.webp';
import accuracyLogo from '../assets/accuracy-icon-png-favpng-zctncZUMQW8PwTsbrTGxXehMU.jpg';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Hero Content */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }} // Initial state (hidden and slightly below)
          animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
          transition={{ duration: 1, delay: 0.5 }} // Animation duration and delay
        >
          <motion.h1
            initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly to the left)
            animate={{ opacity: 1, x: 0 }} // Animate to visible and original position
            transition={{ duration: 1, delay: 1 }} // Animation duration and delay
          >
            Welcome to the Deep Fake Detection Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly to the left)
            animate={{ opacity: 1, x: 0 }} // Animate to visible and original position
            transition={{ duration: 1, delay: 1.5 }} // Animation duration and delay
          >
            Enhancing Deepfake Detection Systems through AI-Driven Models and
            Scalable Architecture
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Initial state (hidden and slightly below)
            animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
            transition={{ duration: 1, delay: 2 }} // Animation duration and delay
          >
            <Link to="/pricing">
              <button className="cta-button">Get Started</button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 50 }} // Initial state (hidden and slightly to the right)
          animate={{ opacity: 1, x: 0 }} // Animate to visible and original position
          transition={{ duration: 1, delay: 1 }} // Animation duration and delay
        >
          {/* Add a hero image here if needed */}
        </motion.div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <motion.div
          className="quote-content"
          initial={{ opacity: 0, y: 50 }} // Initial state (hidden and slightly below)
          whileInView={{ opacity: 1, y: 0 }} // Animate when in view
          transition={{ duration: 1 }} // Animation duration
          viewport={{ once: true }} // Animate only once
        >
          <blockquote>
            “Mark my words — A.I. is far more dangerous than nukes.”
          </blockquote>
          <p className="quote-author">— Elon Musk</p>
        </motion.div>
      </section>

      {/* Deepfake Detection Section */}
      <section className="detection-section">
        <motion.div
          className="detection-content"
          initial={{ opacity: 0, y: 50 }} // Initial state (hidden and slightly below)
          whileInView={{ opacity: 1, y: 0 }} // Animate when in view
          transition={{ duration: 1 }} // Animation duration
          viewport={{ once: true }} // Animate only once
        >
          <h2>Deepfake Detection</h2>
          <p>
            Our advanced AI models can detect deepfake content with unparalleled accuracy.
            Protect yourself from manipulated media with our cutting-edge detection tools.
          </p>
          <div className="detection-features">
            <motion.div
              className="feature"
              initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly to the left)
              whileInView={{ opacity: 1, x: 0 }} // Animate when in view
              transition={{ duration: 1, delay: 0.5 }} // Animation duration and delay
              viewport={{ once: true }} // Animate only once
            >
              <img src={realTimeLogo} alt="Real-Time Analysis Logo" className="feature-logo" />
              <h3>Real-Time Analysis</h3>
              <p>Detect deepfakes in real-time with our state-of-the-art algorithms.</p>
            </motion.div>
            <motion.div
              className="feature"
              initial={{ opacity: 0, x: 50 }} // Initial state (hidden and slightly to the right)
              whileInView={{ opacity: 1, x: 0 }} // Animate when in view
              transition={{ duration: 1, delay: 0.5 }} // Animation duration and delay
              viewport={{ once: true }} // Animate only once
            >
              <img src={accuracyLogo} alt="High Accuracy Logo" className="feature-logo" />
              <h3>High Accuracy</h3>
              <p>Our models achieve over 99% accuracy in detecting manipulated content.</p>
            </motion.div>
            <motion.div
              className="feature"
              initial={{ opacity: 0, y: 50 }} // Initial state (hidden and slightly below)
              whileInView={{ opacity: 1, y: 0 }} // Animate when in view
              transition={{ duration: 1, delay: 0.5 }} // Animation duration and delay
              viewport={{ once: true }} // Animate only once
            >
              <img src={userFriendlyLogo} alt="User-Friendly Logo" className="feature-logo" />
              <h3>User-Friendly</h3>
              <p>Easy-to-use interface for seamless deepfake detection.</p>
            </motion.div>
          </div>
          <Link to="/detection">
            <button className="cta-button">Try Detection Tool</button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          
          <div className="feature-card">
            <img src={userFriendlyLogo} alt="User-Friendly Logo" className="feature-logo" />
            <h3>User-Friendly</h3>
            <p>Easy-to-use interface for both beginners and professionals.</p>
          </div>
          
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <button className="cta-button">Sign Up Now</button>
      </section>
    </div>
  );
}

export default Home;