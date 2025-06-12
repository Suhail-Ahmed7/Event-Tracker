import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance'; // ✅ use custom axios
import { handleError, handleSuccess } from '../utils/utils';
import '../Signup/Signup.css'
const Signup = () => {
  const [signupInfo, setsignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }

    try {
      const { data } = await axiosInstance.post('/auth/signup', signupInfo); // ✅ use instance

      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        handleError(data.message);
      }

    } catch (error) {
      if (error.response?.data?.message) {
        handleError(error.response.data.message); 
      } else {
        handleError('Something went wrong');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Your Account</h1>
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">Get Started</button>
          <span className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;