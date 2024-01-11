import { MovieCategory } from './MovieCategory';
import React from 'react'
import './Navbar.css'
import _ from 'lodash';
import DarkMode from '../DarkMode/DarkMode';


function Navbar({ handleMovieCategoryClicked, movieCategories }) {
  return (
    <div className="navbar">
      <div className="navbar-title">The Movie Store</div>
      <div className="movie-viewership-category-container">
        <>
          <DarkMode />
          {_.map(movieCategories, (movieCategory) => (
            <MovieCategory
            category={movieCategory}
              handleClick={handleMovieCategoryClicked}
              key={movieCategory.type}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default Navbar