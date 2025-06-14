import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Dashboard/Dashboard.css';
import { handleError, handleSuccess } from '../utils/utils';
import axiosInstance from '../utils/axiosInstance';

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Dashboard({ isSuccess, setIsSuccess }) {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/events')
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        handleError('Failed to load events');
      });
  }, [isSuccess]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleModal = (show) => {
    const modal = document.getElementById('eventModal');
    if (modal) modal.style.display = show ? 'block' : 'none';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, location, date } = formData;

    if (!title || !description || !location || !date) {
      return handleError('All fields are required.');
    }

    axiosInstance
      .post('/events', formData)
      .then(() => {
        handleSuccess('Event created successfully!');
        setFormData({ title: '', description: '', location: '', date: '' });
        setIsSuccess((prev) => !prev);
        toggleModal(false);
      })
      .catch(() => {
        handleError('Failed to create event.');
        setIsSuccess(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    axiosInstance
      .delete(`/events/${id}`)
      .then(() => {
        handleSuccess('Event deleted successfully!');
        setIsSuccess((prev) => !prev);
      })
      .catch(() => {
        handleError('Failed to delete event.');
        setIsSuccess(false);
      });
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      handleSuccess('Logged out successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      handleError('Failed to log out.');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Event Tracker Dashboard</h2>
        <div className="header-actions">
          <button className="btn btn-add" onClick={() => toggleModal(true)}>
            <AddIcon style={{ marginRight: '6px' }} /> Add Event
          </button>
          <Link to="/home" className="btn btn-home">
            <HomeIcon style={{ marginRight: '6px' }} /> Home
          </Link>
          <button className="btn btn-logout" onClick={handleLogout}>
            <LogoutIcon style={{ marginRight: '6px' }} /> Logout
          </button>
        </div>
      </header>

      <div className="dashboard-card">
        <div className="events-grid">
          {events?.length > 0 ? (
            events.map((event) => (
              <div className="event-card" key={event._id}>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                <div className="event-actions">
                  <Link className="btn btn-update" to={`/update/${event._id}`}>
                    <EditIcon style={{ marginRight: '4px' }} /> Update
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="btn btn-delete"
                  >
                    <DeleteIcon style={{ marginRight: '4px' }} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-events">No events available.</p>
          )}
        </div>

        {/* Add Event Modal */}
        <div className="modal" id="eventModal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add New Event</h3>
              <button type="button" className="close-btn" onClick={() => toggleModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {['title', 'description', 'location', 'date'].map((field) => (
                  <div className="form-group" key={field}>
                    <label htmlFor={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={formData[field]}
                      type={field === 'date' ? 'date' : 'text'}
                      className="form-control"
                      name={field}
                      id={field}
                      placeholder={`Enter ${field}`}
                      required
                    />
                  </div>
                ))}
                <button type="submit" className="btn btn-add">
                  <AddIcon style={{ marginRight: '6px' }} /> Add Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
