import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../clientregister.css'; // Import the external CSS file

const BusinessForm = () => {
  const [step, setStep] = useState(1); // Track the current step
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/businesses', data);
      console.log('Business created successfully:', response.data);
      alert('Business registration successful!');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  // Proceed to the next step
  const nextStep = () => setStep(step + 1);

  // Go back to the previous step
  const prevStep = () => setStep(step - 1);

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2 className="registration-title">
          Business Registration (Step {step} of 3)
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basic Business Information */}
          {step === 1 && (
            <div className="form-step">
              <div>
                <label>Business Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Business name is required' })}
                  className="registration-input"
                />
                {errors.name && (
                  <p className="registration-error">{errors.name.message}</p>
                )}
              </div>

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

              <div>
                <label>Phone</label>
                <input
                  type="text"
                  {...register('phone')}
                  className="registration-input"
                />
              </div>

              <div>
                <label>Website</label>
                <input
                  type="text"
                  {...register('website')}
                  className="registration-input"
                />
              </div>

              <div>
                <label>Logo URL</label>
                <input
                  type="text"
                  {...register('logo')}
                  className="registration-input"
                />
              </div>

              <div>
                <label>Description</label>
                <textarea
                  {...register('description')}
                  className="registration-input"
                />
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="registration-button"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Address Information */}
          {step === 2 && (
            <div className="form-step">
              <div>
                <label>Street</label>
                <input
                  type="text"
                  {...register('address.street')}
                  className="registration-input"
                />
              </div>

              <div>
                <label>City</label>
                <input
                  type="text"
                  {...register('address.city')}
                  className="registration-input"
                />
              </div>

              <div>
                <label>State</label>
                <input
                  type="text"
                  {...register('address.state')}
                  className="registration-input"
                />
              </div>

              <div>
                <label>Country</label>
                <input
                  type="text"
                  {...register('address.country')}
                  className="registration-input"
                />
              </div>

              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  {...register('address.postalCode')}
                  className="registration-input"
                />
              </div>

              <div className="form-navigation">
                <button
                  type="button"
                  onClick={prevStep}
                  className="registration-button secondary"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="registration-button"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Authentication and Subscription */}
          {step === 3 && (
            <div className="form-step">
              <div>
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

              <div>
                <label>Subscription Plan</label>
                <select
                  {...register('subscriptionPlan')}
                  className="registration-input"
                >
                  <option value="free">Free</option>
                  <option value="basic">Basic</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label>Payment Method</label>
                <input
                  type="text"
                  {...register('paymentMethod')}
                  className="registration-input"
                />
              </div>

              <div className="form-navigation">
                <button
                  type="button"
                  onClick={prevStep}
                  className="registration-button secondary"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="registration-button"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BusinessForm;