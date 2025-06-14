import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Home/Home.css';
import { handleError, handleSuccess } from '../utils/utils';
import axiosInstance from '../utils/axiosInstance';
import { LogOut } from 'lucide-react'; 

const Home = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        handleError('Unable to fetch events. Please try again later.');
      });
  }, []);

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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return { day, month, full: `${day}-${month}-${year}` };
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>List Of All Events</h1>
        <div className="header-actions">
          <Link className="btn btn-dashboard" to="/dashboard">
            Dashboard
          </Link>
          <button className="btn btn-logout" onClick={handleLogout} aria-label="Log out">
            <LogOut size={18} style={{ marginRight: '8px' }} />
            Logout
          </button>
        </div>
      </header>

      <div className="content">
        {events.length === 0 ? (
          <div className="no-events">No events available.</div>
        ) : (
          events.map((event) => (
            <EventCard key={event._id || event.id} event={event} formatDate={formatDate} />
          ))
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event, formatDate }) => {
  const { day, month, full } = formatDate(event.date);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    if (descRef.current && descRef.current.scrollHeight > 72) {
      setIsLong(true);
    }
  }, []);

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-body">
          <div className="event-widget">
            <div className="date-display">
              <span className="date-day">{day}</span>
              <span className="date-month">{month}</span>
            </div>
            <div className="event-info">
              <span className="event-title"><b>{event.title}</b></span><br />
              <span className="event-location"><b>{event.location}</b></span>
            </div>
          </div>

          <div
            className={`event-description ${isExpanded ? 'expanded' : ''}`}
            ref={descRef}
          >
            {event.description}
          </div>

          {isLong && (
            <button
              className="read-more-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}

          <div className="event-action">
            <button className="btn btn-date" onClick={(e) => e.preventDefault()}>
              {full}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
