import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../Button/Button";
import './Preview.scss'
import * as actions from '../../store/actions'
import {Movies} from "../../store/mockBD/movies";
import CSSTransition from "react-transition-group/cjs/CSSTransition";

const TimeToChange = 10;

const Preview = props => {

  const dispatch = useDispatch();

  const history = useHistory();

  const [showPreview, setShowPreview] = useState(false);

  const [timer, setTimer] = useState(null);

  let preview = useSelector(state => {
    return state.watchList.preview;
  })

  useEffect(() => {
    setPreview();
  }, [preview]);

  useEffect(() => {
    return (e) => {
      clearInterval(timer);
    };
  },[timer]);

  const setPreview = () => {
    if (timer) clearInterval(timer);
    setTimeout(() => {
      setShowPreview(true);
    }, 300);
    const interval = setInterval(() => {
      changePreview()
    }, TimeToChange * 1000);
    setTimer(interval);
  }

  const changePreview = () => {
    setShowPreview(false);
    setTimeout(() => {
      const movieId = getRandomArbitrary(0, Movies.length, preview.id);
      dispatch(actions.changePreview(movieId));
    }, 300);
  }

  const getRandomArbitrary = (min, max, current) => {
    let result = current;
    while (result === current) {
      min = Math.ceil(min);
      max = Math.floor(max);
      result = Math.floor(Math.random() * (max - min)) + min;
    }
    return result;
  }

  const onMovieAdded = () => {
    changePreview();
    dispatch(actions.addMovie(preview.id));
  }

  const toMovie = () => {
    history.push(`/movie?movieId=${preview.id}`);
    changePreview();
  }

  return (
    <div className='Preview-container'>
    <CSSTransition
      in={ showPreview }
      timeout={300}
      unmountOnExit
      classNames='Preview-item'
    >
      <div className="Preview">
        <div className="Content-container">
          <h2 className="Title">
            { preview.title }
          </h2>
          <div className="Description">
            { preview.description }
          </div>
          <div className="Button-container">
        <span className="Watch-now" onClick={ toMovie }>
          <Button>
            Watch now
          </Button>
        </span>
        <span className="My-list-button" onClick={ onMovieAdded }>
           <Button>
             + My list
           </Button>
        </span>
          </div>
        </div>
        <div className="Image-container">
          <img src={ preview.imageSrc } alt=""/>
        </div>
      </div>
    </CSSTransition>
    </div>
  );
}

export default Preview;

