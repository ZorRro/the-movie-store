import React from 'react';
export function MovieCategory({ category, handleClick }) {
  return (
    <div
      className="movie-viewership-category"
      onClick={() => {
        handleClick && handleClick(category.type);
      }}
    >
      <span>
        {category.title}
        <img src={category.icon} alt={category.type} className="viewership-category-icon" />
      </span>
    </div>
  );
}
