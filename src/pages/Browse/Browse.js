import React, {useEffect, useState} from 'react';

import MovieList from "../../components/MovieList/MovieList";
import './Browse.scss'
import { Horrors, Dramas, SciFi, Comedies, Actions } from "../../store/mockBD/movies";

const Browse = props => {

  const { location } = props;
  const [ movies, setMovies ] = useState({});
  const [ isMovies, setIsMovies ] = useState(false);

  useEffect(() => {
    setData();
  }, [location]);

  const setData = () => {
    const movieName = new URLSearchParams(location.search).get('movieName')?.toLocaleLowerCase() || '';
    let horrors = Horrors.filter(movie => movie.name.toLocaleLowerCase().includes(movieName));
    let dramas = Dramas.filter(movie => movie.name.toLocaleLowerCase().includes(movieName));
    let actions = Actions.filter(movie => movie.name.toLocaleLowerCase().includes(movieName));
    let sciFi = SciFi.filter(movie => movie.name.toLocaleLowerCase().includes(movieName));
    let comedies = Comedies.filter(movie => movie.name.toLocaleLowerCase().includes(movieName));
    setMovies({ horrors, dramas, actions, comedies, sciFi });
    setIsMovies(!![...horrors, ...dramas, ...actions, ...sciFi, ...comedies].length);
  }

  const data = isMovies
    ? (
      <div>
        <MovieList movies = { movies.horrors } title='Horrors'> </MovieList>,
        <MovieList movies = { movies.dramas } title='Dramas'> </MovieList>,
        <MovieList movies = { movies.sciFi } title='SciFi'> </MovieList>,
        <MovieList movies = { movies.comedies } title='Comedies'> </MovieList>,
        <MovieList movies = { movies.horrors } title='Actions'> </MovieList>
      </div>
    )
  : (
    <h2 className='Empty-list'> No movie matches your request</h2>
    );
  return (
    <div className='Browse-container'>
      <h1>Movies, serials and shows</h1>
      { data }
    </div>
  );
}

export default Browse;
