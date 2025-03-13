import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <h2>Register</h2>
      <p>Choose your account type:</p>
      <button onClick={() => navigate('/register/client')} className="register-button">
        Register as Client
      </button>
      <button onClick={() => navigate('/register/business')} className="register-button">
        Register as Business
      </button>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
}

export default Register;