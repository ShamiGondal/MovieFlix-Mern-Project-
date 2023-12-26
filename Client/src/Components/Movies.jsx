import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import Loader from './Loader';

const Movies = () => {
  const localhost = `https://movieflix-server-side-deployment-production.up.railway.app`
  // const localhost = `http://localhost:4000`
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  const loadMovies = async () => {
    try {
      const response = await fetch(`${localhost}/api/movies/fetchMovies`);
      if (!response.ok) {
        console.error('Could not load the Movies');
      } else {
        const data = await response.json();
        setMovies(data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center mb-4">All Movies</h2>

      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {currentMovies.map((movie) => (
              <div key={movie._id} className="col">
                <MovieCard movie={movie} onDetailsClick={() => handleMovieClick(movie)} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Movies;
