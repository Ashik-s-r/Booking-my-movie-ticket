import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Listposts() {
  const user = useSelector((store) => store.auth.user);
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(() => {
    if (user) {
      axios.get("http://127.0.0.1:8000/list", {
        headers: { Authorization: "Token " + user.token },
      }).then((response) => {
        setPosts(response.data);
      }).catch((error) => {
        console.error("Failed to fetch posts:", error);
      });
    }
  }, [user]);

  useEffect(() => { 
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="list">
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center mov">
          <div className="col-md-12 border rounded p-6 bg-light" style={{ borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <h1 className="text-center my-4" style={{ color: '#1E90FF' }}>MOVIE LIST</h1>
            
            <style jsx>{`
              .carousel-container {
                max-width: 100%;
                height: 500px; /* Adjust the height as needed */
                overflow: hidden;
                border-radius: 15px;
              }

              .carousel-container img {
                width: 100%;
                height: 500px;
                object-fit: cover; /* Ensure the image covers the entire area */
              }
            `}</style>

            {posts.length > 0 && (
              <Carousel className="carousel-container mb-4">
                {posts.slice(0, 5).map(post => (
                  <Carousel.Item key={post.id}>
                    <Link to={"/blog/posts/" + post.id} style={{ textDecoration: 'none' }}>
                      <img
                        className="d-block w-100"
                        src={`http://127.0.0.1:8000${post.poster}`}
                        alt={post.name}
                      />
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
            
            {posts.length === 0 ? (
              <center><h3 className="text-md-center">NO MOVIE POSTER FOUND...</h3></center>
            ) : (
              <div className="row">
                {posts.map(post => (
                  <div key={post.id} className="col-md-3 mb-4">
                    <Link to={"/blog/posts/" + post.id} style={{ textDecoration: 'none' }}>
                      <div className="card h-100">
                        <img className="card-img-top" src={`http://127.0.0.1:8000${post.poster}`} alt={post.name} style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', objectFit: 'cover', height: '250px' }} />
                        <div className="card-body text-center">
                          <h5 className="card-title" style={{ color: '#333' }}>{post.time}</h5>
                          <h4 className="card-title" style={{ color: '#1E90FF' }}>{post.name}</h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listposts;
