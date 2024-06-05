import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';

function MovieDetailsWithBooking() {
  const user = useSelector((store) => store.auth.user);
  const { postId } = useParams();
  const [post, setPost] = useState({ name: '', time: '', ticket_amount: '', description: '' });
  const [selectedDate, setSelectedDate] = useState("2024-05-13");
  const navigate = useNavigate();

  useEffect(() => {
    console.log('postId:', postId);
    if (user && user.token) {
      axios.get(`http://127.0.0.1:8000/view/${postId}/`, {
        headers: { Authorization: `Token ${user.token}` }
      })
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch movie details:", error);
      });
    }
  }, [postId, user]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card movie-card shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-primary">MOVIE NAME: {post.name}</h3>
                <h4 className="card-subtitle mb-2 text-muted">MOVIE TIME: {post.time}</h4>
                <p className="card-text"><strong>Details:</strong> {post.description}</p>
                <p className="card-text"><strong>Ticket Amount:</strong> ${post.ticket_amount}</p>
                <div className='mb-3'>
                  <label htmlFor="selectDate" className="form-label">Select Date:</label>
                  <select className="form-select date-select" id="selectDate" name="selectDate" value={selectedDate} onChange={handleDateChange}>
                    <option value="2024-05-13">May 13, 2024</option>
                    <option value="2024-05-14">May 14, 2024</option>
                    <option value="2024-05-15">May 15, 2024</option>
                  </select>
                </div>
                <Link to={`/blog/post/${postId}?date=${selectedDate}`} className="btn btn-info">BOOKING</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        body {
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
        }
        .movie-card {
          border-radius: 10px;
          background-color: #fff;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .movie-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .card-body {
          padding: 30px;
        }
        .card-title {
          font-size: 1.75rem;
          margin-bottom: 20px;
        }
        .card-subtitle {
          font-size: 1.25rem;
          margin-bottom: 15px;
        }
        .card-text {
          font-size: 1.1rem;
          margin-bottom: 10px;
        }
        .form-label {
          font-weight: bold;
        }
        .form-select {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ced4da;
          background-color: #fff;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .form-select:focus {
          border-color: #80bdff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
        }
        .form-select.date-select {
          padding: 12px;
          font-size: 1rem;
          background-image: url('data:image/svg+xml,%3Csvg viewBox%3D%220 0 4 5%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath fill%3D%22%23444%22 d%3D%22M2 0L0 2h4L2 0zM2 5L0 3h4L2 5z%22/%3E%3C/svg%3E');
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 8px 10px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        .btn-info {
          background-color: #17a2b8;
          border: none;
          color: white;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 1rem;
          margin-top: 20px;
          border-radius: 5px;
          transition: background-color 0.3s, transform 0.3s;
        }
        .btn-info:hover {
          background-color: #138496;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default MovieDetailsWithBooking;
