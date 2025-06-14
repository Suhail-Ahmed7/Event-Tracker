import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // ✅ import custom axios
import '../Update/Update.css';

function Update() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/events/${id}`)
      .then((res) => {
        setFormData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        alert('Error fetching event.');
        setIsLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axiosInstance
      .put(`/events/${id}`, formData) // ✅ token already handled
      .then(() => {
        alert('Event updated successfully!');
      })
      .catch(() => {
        alert('Error updating event.');
      });
  };

  return (
    <div className="update-container">
      <header className="update-header">
        <h1 className="update-title">Update Event</h1>
        <Link className="btn btn-dashboard" to="/dashboard">
          Dashboard
        </Link>
      </header>
      <div className="update-card">
        {isLoading ? (
          <h3 className="loading-text">Loading...</h3>
        ) : (
          <form onSubmit={handleUpdate} className="update-form">
            {['title', 'description', 'location', 'date'].map((field) => (
              <div className="form-group" key={field}>
                <label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === 'date' ? 'date' : 'text'}
                  className="form-control"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit" className="btn btn-update">Update</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Update;