import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../clientregister.css'; // Import the external CSS file

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/api/register', data);
      console.log('Registration successful:', response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2 className="registration-title">Register as Client</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="registration-form-fields">
          {/* First Name */}
          <div>
            <label>First Name</label>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className="registration-input"
            />
            {errors.firstName && (
              <p className="registration-error">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label>Last Name</label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className="registration-input"
            />
            {errors.lastName && (
              <p className="registration-error">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="registration-input"
            />
            {errors.email && (
              <p className="registration-error">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label>Phone</label>
            <input
              type="text"
              {...register('phone')}
              className="registration-input"
            />
          </div>

          {/* Password */}
          <div className="password-container"> {/* Add this class */}
            <label>Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="registration-input"
            />
            {errors.password && (
              <p className="registration-error">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="registration-button">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;