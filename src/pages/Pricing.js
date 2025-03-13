import React from 'react';
import '../styles/Pricing.css'

function Pricing() {
  return (
    <div className="pricing-page">
      <h2>Choose Your Plan</h2>
      <p>Select the plan that best suits your needs.</p>
      <div className="pricing-cards">
        {/* Basic Plan */}
        <div className="pricing-card">
          <h3>Basic</h3>
          <p className="price">$9.99<span>/month</span></p>
          <ul>
            <li>10 Deepfake Generations</li>
            <li>Standard Quality</li>
            <li>Email Support</li>
          </ul>
          <button className="pricing-button">Get Started</button>
        </div>

        {/* Pro Plan */}
        <div className="pricing-card pro">
          <h3>Pro</h3>
          <p className="price">$29.99<span>/month</span></p>
          <ul>
            <li>50 Deepfake Generations</li>
            <li>High Quality</li>
            <li>Priority Support</li>
            <li>Custom Watermark</li>
          </ul>
          <button className="pricing-button">Get Started</button>
        </div>

        {/* Business Plan */}
        <div className="pricing-card">
          <h3>Business</h3>
          <p className="price">$99.99<span>/month</span></p>
          <ul>
            <li>Unlimited Generations</li>
            <li>Ultra-High Quality</li>
            <li>24/7 Support</li>
            <li>Custom Branding</li>
            <li>API Access</li>
          </ul>
          <button className="pricing-button">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;