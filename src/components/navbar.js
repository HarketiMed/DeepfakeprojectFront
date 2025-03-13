import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../assets/logo.png'; // Adjust the path to your logo

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Deepfake Project Logo" className="logo" />
          <Link to="/">Deep Fake Detector</Link>
        </Link>
      </div>
      <ul className="navbar-links">
        <button className="registerbutton"><Link to="/login">Sign in</Link></button>
        <button className="registerbutton"><Link to="/register">Sign up</Link></button>
      </ul>
    </nav>
  );
}

export default Navbar;