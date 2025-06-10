import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils/utils';

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
            const { data } = await axios.post('http://localhost:8000/auth/signup', signupInfo);

            if (data.success) {
                handleSuccess(data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                handleError(data.message);
            }

        } catch (error) {
            if (error.response.data.message) {
                handleError(error.response.data.message); 
            } else {
                handleError('Something went wrong');
            }
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Signup</button>
                <span>
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;
