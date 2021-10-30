import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'

import './Movie.scss'
import { Movies } from '../../store/mockBD/movies';
import * as actions from '../../store/actions'
import { useDispatch } from "react-redux";


const MaxRating = 10;

const Movie = props => {

  const { location } = props;

  const dispatch = useDispatch();

  const [movieId, setMovieId] = useState(0);

  useEffect(() => {
    setData();
  }, [location]);

  const setData = () => {
    const movieId = Number(new URLSearchParams(location.search).get('movieId')?.toLocaleLowerCase() || 0);
    dispatch(actions.addRecent(movieId));
    setMovieId(movieId);
  }

  return (
    <div className='Movie-page'>
      <h1 className="Movie-title">
        { Movies[movieId].name }
      </h1>
      <div className="Movie-page-container">
        <div className="Movie-img">
          <img src={ Movies[movieId].imageSrc } alt="" />
        </div>
        <div className="Movie-info">
          <div className="Movie-rating">
            <FontAwesomeIcon
              className='Icon-star'
              icon={ faStar }
            />
            { Movies[movieId].rating } / {  MaxRating }
          </div>
          <div className="Movie-description">
            { Movies[movieId].description }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
