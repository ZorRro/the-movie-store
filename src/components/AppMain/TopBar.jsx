import React from 'react'
import PopularIcon from '../../assets/fire.png';
import './TopBar.css'
import MovieRatingFilterItem from './MovieRatingFilterItem';
import { MovieCategory } from '../Navbar/MovieCategory';

function TopBar({
  handleFilterByChange,
  minRating,
  handleSortChange,
  sortObj,
  currentPage,
  viewershipCategory,
  handleMoviePageChange,
}) {

  const totalPagesToShow = 11;
  const pagesList = [];
  const half = Math.floor(totalPagesToShow / 2);
  if (currentPage - half > 0) {
    for (let i = currentPage - half; i < currentPage + half; i++) { 
      pagesList.push(i);
    }
  } else {
    for (let i = 1; i < totalPagesToShow ; i++) { 
      pagesList.push(i);
    }
  }

  return (
    <div className="topbar position-center">
      {/* <h2 className="movie-viewership-category position-center">
        {viewershipCategory}
        <img
          src={PopularIcon}
          alt="popular"
          className="viewership-category-icon"
        />
      </h2> */}
      <MovieCategory category={viewershipCategory} />
      <div className="movie-pagination position-center">
        <button
          type="button"
          onClick={() => {
            handleMoviePageChange(currentPage - 1);
          }}
          className="page-nav"
        >
          Prev
        </button>
        {currentPage > half && '..'}
        {pagesList.map((page) => {
          return (
            <h4
              onClick={() => {
                handleMoviePageChange(page);
              }}
              className={
                page == currentPage ? 'movie-page active' : 'movie-page'
              }
              key={page}
            >
              {page}
            </h4>
          );
        })}
        ..
        <button
          type="button"
          onClick={() => {
            handleMoviePageChange(currentPage + 1);
          }}
          className="page-nav"
        >
          Next
        </button>
      </div>
      <div className="movie-list-fs position-center">
        <ul className="movie-star-filter position-center">
          <MovieRatingFilterItem
            handleFilterByChange={handleFilterByChange}
            rating={8}
            minRating={minRating}
          />
          <MovieRatingFilterItem
            handleFilterByChange={handleFilterByChange}
            rating={7}
            minRating={minRating}
          />
          <MovieRatingFilterItem
            handleFilterByChange={handleFilterByChange}
            rating={6}
            minRating={minRating}
          />
        </ul>
        <select
          className="movie-sorting"
          name="sortAttribute"
          id=""
          value={sortObj.sortAttribute}
          onChange={handleSortChange}
        >
          <option value="default">Select</option>
          <option value="date">Date</option>
          <option value="rating">Rating</option>
        </select>
        <select
          className="movie-sorting"
          name="sortOrder"
          id=""
          value={sortObj.sortOrder}
          onChange={handleSortChange}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default TopBar