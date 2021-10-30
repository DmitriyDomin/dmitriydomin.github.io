import React from 'react'
import { connect } from "react-redux";

import Preview from "../../components/Preview/Preview";
import { Movies, TrendingMovies, MostWatched, TopMovies } from '../../store/mockBD/movies';
import MovieList from '../../components/MovieList/MovieList';

const Main = props => {

  return (
    <div>
      <Preview movie={ Movies[0] }>
      </Preview>
      <MovieList
        movies = { TrendingMovies.slice() }
        title = 'Trending now'
      >
      </MovieList>
      <MovieList
        movies = { MostWatched.slice() }
        title = 'Most Watched'
      >
      </MovieList>
      <MovieList
        movies = { TopMovies.slice() }
        title = 'Best reviews'
      >
      </MovieList>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
  }
}

export default connect(mapStateToProps)(Main);
