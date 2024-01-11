import React from 'react'

function MovieRatingFilterItem({ rating, minRating, handleFilterByChange }) {
  const determineClassName = (rating) => {
    let className = 'movie-filter-item';
    if (rating == minRating) {
      className += ' active';
    }
    return className;
  }

  return (
      <li className={determineClassName(rating)} onClick={() => handleFilterByChange(rating)}>{rating} Star</li>
  )
}

export default MovieRatingFilterItem