import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard/Dashboard.css';
import { handleError, handleSuccess } from '../utils/utils';
import axiosInstance from '../utils/axiosInstance'; // ✅ import custom axios

function Dashboard({ isSuccess, setIsSuccess }) {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
  });

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
        setIsSuccess(prev => !prev);
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
        setIsSuccess(prev => !prev);
      })
      .catch(() => {
        handleError('Failed to delete event.');
        setIsSuccess(false);
      });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Event Tracker Dashboard</h2>
        <div className="header-actions">
          <button className="btn btn-add" onClick={() => toggleModal(true)}>
            Add Event
          </button>
          <Link to="/home" className="btn btn-home">
            Home
          </Link>
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
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="btn btn-delete"
                  >
                     Delete ❎
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
                    <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
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
                <button type="submit" className="btn btn-add">Add Event</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;