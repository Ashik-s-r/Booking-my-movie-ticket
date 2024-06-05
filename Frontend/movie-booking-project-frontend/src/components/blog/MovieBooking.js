import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TicketBooking = () => {
  const user = useSelector((store) => store.auth.user);
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Extract date from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const yourDate = searchParams.get('date');

  useEffect(() => {
    // Check if the user is authenticated before allowing booking
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const ticketOptions = Array.from({ length: 50 }, (_, i) => (i + 1).toLocaleString());

  const toggleTicketSelection = (ticketNumber) => {
    setSelectedTickets((prev) => {
      if (prev.includes(ticketNumber)) {
        return prev.filter((t) => t !== ticketNumber);
      } else {
        return [...prev, ticketNumber];
      }
    });
  };

  const sendConfirmationEmail = async (booking_id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/email/${postId}/`, 
        { user_email: user.email }, 
        { headers: { Authorization: `Token ${user.token}` } }
      );
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const handleBookTicket = async () => {
    setIsBooking(true);
    setResponseMessage(null);
    setErrorMessage(null);
    try {
      const totalTickets = selectedTickets.length;
      if (totalTickets === 0) {
        throw new Error('Please select at least one ticket.');
      }
      const response = await axios.post(
        `http://127.0.0.1:8000/start-payment/${postId}/`,
        { tickets: totalTickets, date: yourDate },
        {
          headers: { Authorization: `Token ${user.token}` },
        }
      );

      const { booking_id, razorpay_order_id, amount } = response.data;
      const options = {
        key: 'rzp_test_Guf2nFyMEOLEy5',
        amount: amount * 100,
        currency: 'INR',
        order_id: razorpay_order_id,
        name: 'Ticket Booking',
        description: 'Book movie tickets',
        handler: async (paymentResponse) => {
          const { razorpay_payment_id } = paymentResponse;
          await axios.post('http://127.0.0.1:8000/handle-payment-success/', 
            { razorpay_order_id, razorpay_payment_id },
            { headers: { Authorization: `Token ${user.token}` } }
          );

          await sendConfirmationEmail(booking_id);
          setResponseMessage('Booking Successful');
        },
        theme: {
          color: '#ff6b00',
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || error.message || 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div style={styles.ticketBooking}>
      <div style={styles.bookingContainer}>
        <h2 style={styles.heading}>BOOK YOUR TICKETS</h2>
        <div style={styles.ticketOptions}>
          {ticketOptions.map((option) => (
            <button 
              key={option} 
              onClick={() => toggleTicketSelection(option)} 
              style={{ ...styles.ticket, backgroundColor: selectedTickets.includes(option) ? '#ff6b00' : '#fff', color: selectedTickets.includes(option) ? '#fff' : '#ff6b00' }}>
              {option}
            </button>
          ))}
        </div>
        <div style={styles.paymentButtonContainer}>
          <button onClick={handleBookTicket} style={styles.payButton} disabled={isBooking}>
            BOOK TICKETS
          </button>
        </div>
        {responseMessage && <div style={styles.responseMessage}>{responseMessage}</div>}
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
      </div>
    </div>
  );
};

const styles = {
  ticketBooking: {
    backgroundColor: '#f8f8f8',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  bookingContainer: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    color: '#ff6b00',
  },
  ticketOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ticket: {
    margin: '5px',
    padding: '10px 15px',
    border: '2px solid #ff6b00',
    cursor: 'pointer',
  },
  paymentButtonContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  payButton: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#ff6b00',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  responseMessage: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '18px',
    color: '#009a00',
  },
  errorMessage: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '18px',
    color: '#d8000c',
  },
};

export default TicketBooking;
