import React from 'react'
import './AppMain.css'
import MovieCard from './MovieCard';
import TopBar from './TopBar';

function AppMain({
  movies,
  handleFilterByChange,
  minRating,
  handleSortChange,
  sortObj,
  viewershipCategory,
  currentPage,
  handleMoviePageChange,
}) {
  return (
    <>
      <TopBar
        handleFilterByChange={handleFilterByChange}
        minRating={minRating}
        handleSortChange={handleSortChange}
        sortObj={sortObj}
        viewershipCategory={viewershipCategory}
        currentPage={currentPage}
        handleMoviePageChange={handleMoviePageChange}
      />

      {movies.length ? (
        <div className="movie-list">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
      ) : (
        <h2 className="no-movies position-center">
          Movies not available with the selected options...
        </h2>
      )}
    </>
  );
}

export default AppMain