import * as actionTypes from './actionTypes'

export const setMovies = (movies) => {
  return {
    type: actionTypes.SET_MOVIES,
    movies
  }
}

export const setRecent = (movies) => {
  return {
    type: actionTypes.SET_RECENT,
    movies
  }
}

export const addMovie = (movieId) => {
  return {
    type: actionTypes.ADD_MOVIE,
    movieId
  }
}

export const removeMovie = (movieId) => {
  return {
    type: actionTypes.REMOVE_MOVIE,
    movieId
  }
}

export const addRecent = (movieId) => {
  return {
    type: actionTypes.ADD_RECENT,
    movieId
  }
}

export const initMovies = () => {
  return dispatch => {
    const movies = JSON.parse(localStorage.getItem('movies'));
    if (!movies) return;
    dispatch(setMovies(movies));
  }
}

export const initRecentMovies = () => {
  return dispatch => {
    const movies = JSON.parse(localStorage.getItem('recent'));
    if (!movies) return;
    dispatch(setRecent(movies));
  }
}

export const changePreview = (movieId) => {
  return {
    type: actionTypes.CHANGE_PREVIEW,
    movieId
  }
}
