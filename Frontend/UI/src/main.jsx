import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Update from './components/Update/Update.jsx';
import ProtectedRoute from './components/PrivateRoute.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><App /></ProtectedRoute>
        } />
        <Route path="/home" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path="/update/:id" element={
          <ProtectedRoute><Update /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
