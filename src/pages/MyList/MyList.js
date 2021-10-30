import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";

import MovieList from "../../components/MovieList/MovieList";
import './MyList.scss'

const MyList = props => {

  const { location } = props;

  const movies = useSelector(state => {
    return state.watchList.movies;
  });

  console.log(movies, 'Movies');

  const [movieName, setMovieName] = useState('');

  useEffect(() => {
    setMovieName(new URLSearchParams(location.search).get('movieName')?.toLocaleLowerCase() || '')
  },[location]);

  return (
    <div className='My-list'>
      <div className="My-list__header">
        <h1>Your Movies</h1>
      </div>
      <MovieList
        movies = { movies.slice().filter(movie => movie.name.toLowerCase().includes(movieName)) }
        elementClass = 'Movie-element'
      >
      </MovieList>
    </div>
  );
}

export default MyList;
