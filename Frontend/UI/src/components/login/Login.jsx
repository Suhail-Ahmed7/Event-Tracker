import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance'; // ✅ use custom instance
import { handleError, handleSuccess } from '../utils/utils';
import '../login/login.css'
const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email.trim() || !password.trim()) {
      return handleError('Email and password are required');
    }

    try {
      const { data } = await axiosInstance.post('/auth/login', loginInfo); // ✅ simplified path

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        handleSuccess(data.message);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        handleError(data.message);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(msg => handleError(msg));
      } else if (error.response?.data?.message) {
        handleError(error.response.data.message);
      } else {
        handleError('Something went wrong');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginInfo.email}
                onChange={handleChange}
                required
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
                value={loginInfo.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">Login</button>
          <span className="signup-link">
            Don't have an account? <Link to="/signup">Signup</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;