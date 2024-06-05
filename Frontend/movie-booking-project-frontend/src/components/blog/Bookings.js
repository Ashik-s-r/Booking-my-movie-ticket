import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Listposts() {
  const user = useSelector((store) => store.auth.user);
  const [posts, setPosts] = useState([]);

  const fetchPostsAndGeneratePDF = useCallback(() => {
    if (user) {
      axios.get("http://127.0.0.1:8000/my-bookings", {
        headers: { Authorization: "Token " + user.token },
      }).then((response) => {
        setPosts(response.data);
      }).catch((error) => {
        console.error("Failed to fetch posts:", error);
      });
    }
  }, [user]);

  useEffect(() => { 
    fetchPostsAndGeneratePDF();
  }, [fetchPostsAndGeneratePDF]);

  const downloadBooking = (pk) => {
    if (user) {
        axios
            .get(`http://127.0.0.1:8000/product/pdf/${pk}/`, {
                headers: { Authorization: `Token ${user.token}` },
                responseType: "blob", // This is important for downloading files
            })
            .then((response) => {
                // Create a link to download the file
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `booking_${pk}.pdf`); // Set the filename for the download
                document.body.appendChild(link);
                link.click(); // Trigger the download
                document.body.removeChild(link); // Clean up the DOM
            })
            .catch((err) => {
                console.error("Failed to download booking:", err);
            });
    }
  };

  return (
    <div className="list">
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center mov">
          <div className="col-md-12 border rounded p-6 bg-light" style={{ borderRadius: "15px", boxShadow: "0 0 10px rgb(0, 0, 0)" }}>
            <div className="row mb-4">
              {posts.map(post => (
                <div key={post.id} className="col-md-3">
                  <p>{post.booking_date}</p>
                  <p>{post.tickets}</p>
                  <p>{post.razorpay_order_id}</p><br/>
                  {/* Add a button to trigger download of PDF and QR code */}
                  <button className="btn btn-warning" onClick={() => downloadBooking(post.id)}>Download PDF & QR</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listposts;
