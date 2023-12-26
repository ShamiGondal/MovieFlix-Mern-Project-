import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const localhost = `https://movieflix-server-side-deployment-production.up.railway.app`
  // const localhost = `http://localhost:4000`
  const [likes, setLikes] = useState(movie.likes);

  const handleLikeClick = async () => {
    try {
      const response = await fetch(`${localhost}/api/movies/likes/${movie._id}`, {
        method: 'POST',
      });

      if (!response.ok) {
        console.error('Failed to increase likes');
        return;
      }

      // Update the likes in the state
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error increasing likes:', error);
    }
  };

  const truncatedDescription = movie.description.length > 100
    ? `${movie.description.substring(0, 100)}...`
    : movie.description;

  return (
    <div className="card h-100">
      <img src={movie.picture} className="card-img-top" alt={movie.name} />
      <div className="card-body">
        <h5 className="card-title">{movie.name}</h5>
        <p className="card-text">{truncatedDescription}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Likes
          <span className="badge bg-primary rounded-pill">{likes}</span>
        </li>
      </ul>
      <div className="card-body d-flex justify-content-between">
        <button className="btn btn-outline-primary me-2 " onClick={handleLikeClick}>
          <i className="bi bi-heart"></i> Like
        </button>
        <Link to={`/fetchMoive/${movie._id}`} className="btn btn-primary">
          Watch Now
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
