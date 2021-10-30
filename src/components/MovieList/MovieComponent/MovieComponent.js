import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import './MovieComponent.scss'
import * as actions from "../../../store/actions";
import CSSTransition from "react-transition-group/cjs/CSSTransition";
import { useHistory } from "react-router-dom";

const MaxRating = 10;

const MovieComponent = (props) => {

  const history = useHistory();

  const [showMovie, setShowMovie] = useState(false);

  const [selectClasses, setClasses] = useState(['Movie-Select']);
  const { inWatchList } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectClasses();
  }, [inWatchList]);

  const setSelectClasses = () => {
    setShowMovie(true);
    if (inWatchList) {
      setClasses([...selectClasses, 'Active']);
    } else {
      selectClasses.filter(className => className !== 'Active');
      setClasses(selectClasses.filter(className => className !== 'Active').slice());
    }
  }

  const onMovieAdded = (e) => {
    e.stopPropagation();
    if (!inWatchList) {
      dispatch(actions.addMovie(props.id));
    } else {
      setShowMovie(false);
      dispatch(actions.removeMovie(props.id));
    }
  }

  const toMovie = () => {
    history.push(`/movie?movieId=${props.id}`);
  }

  return (
    <div>
      <CSSTransition
        in={ showMovie }
        timeout={200}
        classNames={ props.elementClass }
        unmountOnExit
      >
        <div className='Movie-component' style={{ backgroundImage: `url(${props.image})` }} onClick={ toMovie }>
          <div className="Movie-container">
            <div className="Movie-Title">{ props.name }</div>
            <div className="Movie-Rating">{ props.rating } / { MaxRating }</div>
            <div className="Movie-Description">{ props.description }</div>
            <div className={ selectClasses.join(' ') } onClick={ onMovieAdded }> </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default MovieComponent;
