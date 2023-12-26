import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "react-rating-stars-component";
import Loader from "./Loader";

const MovieDetails = () => {
  const localhost = `https://movieflix-server-side-deployment-production.up.railway.app`
  // const localhost = `http://localhost:4000`
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  
  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${localhost}/api/movies/fetchMoive/${id}`);
        if (!response.ok) {
          console.error("Could not fetch Movie details");
        } else {
          const data = await response.json();
          setMovie(data);
          setComments(data.comments || []);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`${localhost}/api/movies/fetchMoive/${id}`);
        if (!response.ok) {
          console.error("Could not fetch comments");
        } else {
          const data = await response.json();
          setComments(data.comments || []);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchMovieDetails();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${localhost}/api/movies/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      });

      if (!response.ok) {
        console.error("Failed to add comment");
        return;
      }

      setComments([...comments, newComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!movie) {
    return (
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Movie Details</h2>
        <p><Loader/></p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{movie.name} Details</h2>
      <div className="row">
        <div className="col-md-4">
          <img src={movie.picture} className="img-fluid" alt={movie.name} />
        </div>
        <div className="col-md-8">
          <p>Description: {movie.description}</p>
          <p className="btn btn-danger">Likes: {movie.likes}</p>
          
          {/* Star Rating */}
          <div className="mb-3">
            <Rating
              count={5}
              value={movie.rating} 
              size={24}
              activeColor="#ffd700"
              isHalf={true}
              edit={false}
            />
          </div>

          <div className="mt-4 mb-5">
            <a href={movie.watchLink} className="btn btn-primary me-3" target="_blank" rel="noopener noreferrer">
              Watch Now
            </a>
            <a href={movie.downloadLink} className="btn btn-success" target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </div>

          {/* Comment Section */}
          <div className="mb-4">
            <h4>Comments</h4>
            <ul className="list-unstyled">
              {comments.map((comment, index) => (
                <li key={index} className="bg-light mt-2 p-2">
                 Anonymous: {comment}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Add Comment
              </label>
              <textarea
                className="form-control"
                id="comment"
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-dark mb-5">
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
