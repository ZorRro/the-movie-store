import React from 'react'
import RatingIcon from '../../assets/star.png';
import MovieImage from '../../assets/movie-image.jpeg'
import './MovieCard.css'

function MovieCard({ movie }) {
  return (
    <div>
      <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noreferrer" className="movie-card" key={movie.id}>
        <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie-image" />
        <div className="movie-detail">
          <h3 className="movie-name"> {movie.original_title} </h3>
          <div className="movie-date-rate position-center">
            <p>{ movie.release_date}</p>
            <p className="position-center">
              <span>{movie.vote_average}</span>
              <img className="card-icon" src={RatingIcon} alt="rating icon" />
            </p>
          </div>
          <div className="movie-description">
            {movie.overview.slice(0,100) + '... more' }
          </div>
        </div>
      </a>
    </div>
    )
}

export default MovieCard