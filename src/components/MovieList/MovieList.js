import React, {useEffect, useState} from 'react';
import MovieComponent from "./MovieComponent/MovieComponent";
import './MovieList.scss'
import {useSelector} from "react-redux";
import CSSTransition from "react-transition-group/cjs/CSSTransition";
import { TransitionGroup } from 'react-transition-group';

const MovieList = props => {

  const watchList = useSelector(state => {
    return state.watchList.movies;
  });

  const elementClass = props.elementClass || '';

  console.log(props.movies);
  const movies = props.movies.map(movie => {
    return (
        <CSSTransition
          key={movie.id}
          timeout={500}
          classNames="item"
        >
          <div className="Movie">
            <MovieComponent
              name = { movie.name }
              rating = { movie.rating }
              description = { movie.description }
              image = { movie.imageSrc }
              id = { movie.id }
              inWatchList = { !!watchList.find(movieInList => movieInList.id === movie.id) }
              elementClass = { elementClass }
            >
            </MovieComponent>
          </div>
        </CSSTransition>
      )
    }
  );

  const classes = ["Movie-list"];
  if (props.isRecent) classes.push('Recent');

  const renderData = movies.length
  ? (
      <div className={ classes.join(' ') }>
        <h2 className='Title'>
          { props.title }
        </h2>
        <TransitionGroup className="List" component='div'>
          { movies }
        </TransitionGroup>
      </div>
    )
  : null;


  return (
    renderData
  );
}

export default MovieList;
