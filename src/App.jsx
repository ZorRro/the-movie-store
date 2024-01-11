import './App.css'
import Navbar from './components/Navbar/Navbar'
import AppMain from './components/AppMain/AppMain'
import { useEffect } from 'react';
import { useState } from 'react';
import _ from 'lodash';

import PopularIcon from './assets/fire.png';
import TopRatedIcon from './assets/glowing-star.png';
import UpcomingIcon from './assets/partying-face.png';

const attributeMap = {
  'rating': 'vote_average',
  'date': 'release_date'
}

const supportedMovieCategories = {
  popular: {
    type: 'popular',
    title: 'Popular',
    icon: PopularIcon
  },
  top_rated: {
    type: 'top_rated',
    title: 'Top Rated',
    icon: TopRatedIcon
  },
  upcoming: {
    type: 'upcoming',
    title: 'Upcoming',
    icon: UpcomingIcon
  },

}

function App() {

  const [movies, setMovies] = useState([]);
  const [modifiedMoviesList, setModifiedMoviesList] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    sortAttribute: 'default',
    sortOrder: 'desc'
  });
  const [viewershipCategory, setViewershipCategory] = useState(supportedMovieCategories['popular']);
  const [moviePage, setMoviePage] = useState(1);
  const [movieMetadata, setMovieMetadata] = useState({});

  useEffect(() => {
    fetchMovies();

    async function fetchMovies() {
      console.log('API is invoked to fetch movie');
      const response = await fetch(`https://api.themoviedb.org/3/movie/${viewershipCategory.type}?api_key=0474312fe498f5e9b2dd0a7a4603db62&page=${moviePage}`)
      const body = await response.json();
      console.log(body);
      const { page, total_pages: totalPages, results: moviesList } = body
      // localStorage.setItem('movies', JSON.stringify(moviesList));
      setMovies(moviesList);
      setMovieMetadata({ page, totalPages });
      const filteredAndSortedMovies = applySortFilterToNewMoviesList(moviesList, minRating, sort);
      setModifiedMoviesList(filteredAndSortedMovies);
    }
  }, [viewershipCategory.type, moviePage]);


  useEffect(() => {
    if (sort.sortAttribute !== 'default') {
      const newModifiedMovieList = _.orderBy(modifiedMoviesList, [attributeMap[sort.sortAttribute]], [sort.sortOrder]);
      setModifiedMoviesList(prev => newModifiedMovieList);
    }
  }, [sort])
  

  // Utility functions
  const applySortFilterToNewMoviesList = (moviesList, rating, sort) => {
    let filteredAndSortedMovies = _.chain(moviesList)
      .filter((movie) => movie.vote_average > rating ).value();
    if (sort.sortAttribute !== 'default') {
      filteredAndSortedMovies = _.orderBy(filteredAndSortedMovies, [attributeMap[sort.sortAttribute]], [sort.sortOrder]);
    }
    return filteredAndSortedMovies;
  }

  // Handler functions
  const handleFilterByChange = (rating) => {
    if (rating == minRating) {
      rating = 0
    } 
    setMinRating(prev => rating);
    
    console.log(`Filter by rating ${rating}`)
    const newMovieList = movies.filter(movie => movie.vote_average >= rating);
    setModifiedMoviesList(prev => newMovieList);
  }

  const handleSortChange = (e) => {
    const { target: { name, value } } = e;
    console.log(`name = ${name} value = ${value}`);
    setSort(prev => ({ ...prev, [name]: value }));
  }

  const handleMovieCategoryClicked = (choosenViewershipCategory) => {
    console.log(choosenViewershipCategory);
    setViewershipCategory(prev => supportedMovieCategories[choosenViewershipCategory]);
    setMoviePage(1);
  }
  
  const handleMoviePageChange = (newPage) => {
    if (newPage < 1 || newPage > movieMetadata.totalPages) {
      newPage = 1;
    }
    console.log(newPage);
    setMoviePage(() => newPage);
  }

  return (
    <div className="app">
      <Navbar handleMovieCategoryClicked={handleMovieCategoryClicked} movieCategories={ supportedMovieCategories } />
      <AppMain
        movies={modifiedMoviesList}
        handleFilterByChange={handleFilterByChange}
        minRating={minRating}
        handleSortChange={handleSortChange}
        sortObj={sort}
        viewershipCategory={viewershipCategory}
        currentPage={moviePage}
        handleMoviePageChange={handleMoviePageChange}
      />
    </div>
  );
}

export default App
