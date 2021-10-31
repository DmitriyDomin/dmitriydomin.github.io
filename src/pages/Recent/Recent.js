import React, {useEffect, useState} from 'react';
import  {useSelector } from "react-redux";

import './Recent.scss'
import MovieList from "../../components/MovieList/MovieList";

const Recent = props => {

  const { location } = props;

  const [movieName, setMovieName] = useState('');

  useEffect(() => {
    setMovieName(new URLSearchParams(location.search).get('movieName')?.toLocaleLowerCase() || '')
  },[location]);

  const recent = useSelector(state => {
    return state.watchList.recent;
  });

  return (
    <div>
      <div className="Recent-container">
        <h1 className="Recent-title">Your recent movies</h1>
        <MovieList
          isRecent = { true }
          movies = { recent.slice().filter(movie => movie.name.toLowerCase().includes(movieName)) }
        >
        </MovieList>
      </div>
    </div>
  );
}

export default Recent;
