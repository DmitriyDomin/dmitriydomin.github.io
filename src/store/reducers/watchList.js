import { updateObject } from "../../shared/utility";
import * as actionTypes from '../actions/actionTypes'
import { Movies, Preview } from "../mockBD/movies";

const RECENT_AMOUNT = 10;

const initialState = {
  movies: [],
  recent: [],
  preview: Preview,
}

const saveMoviesToLocalStorage = (newMovies) => {
  localStorage.setItem('movies', JSON.stringify(newMovies));
}

const saveRecentToLocalStorage = (newRecent) => {
  localStorage.setItem('recent', JSON.stringify(newRecent));
}

const addMovie = (state, action) => {
  if (state.movies.find(movie => movie.id === action.movieId)) return;
  const newMovie = { ... Movies.find(movie => movie.id === action.movieId) }
  const updatedMovies = [...state.movies, newMovie];
  saveMoviesToLocalStorage(updatedMovies);
  return { movies: updatedMovies };
}

const setMovies = (state, action) => {
  const updatedMovies = [...action.movies];
  return { movies: updatedMovies };
}

const setRecent = (state, action) => {
  const updatedMovies = [...action.movies];
  return { recent: updatedMovies };
}

const addRecent = (state, action) => {
  const updatedMovies = state.recent.slice();
  const index = state.recent.findIndex(movie => movie.id === action.movieId);
  console.log(index, updatedMovies);
  if (index > -1) {
    updatedMovies.splice(index, 1);
    console.log(updatedMovies, 'dsfdsfdsfds');
  } else if (state.recent.length === RECENT_AMOUNT) {
    updatedMovies.pop();
  }
  updatedMovies.unshift(Movies.find(movie => movie.id === action.movieId));
  console.log(updatedMovies);
  saveRecentToLocalStorage(updatedMovies);
  return { recent: updatedMovies };
}

const changePreview = (state, action) => {
  const updatedMovie = Movies.find(movie => movie.id === action.movieId);
  return { preview: updatedMovie };
}

const removeMovie = (state, action) => {
  const newMovies = state.movies.filter(movie => movie.id !== action.movieId)
  const updatedMovies = [...newMovies];
  saveMoviesToLocalStorage(updatedMovies);
  return { movies: updatedMovies };
}

const watchList = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MOVIE:
      return updateObject(state, addMovie(state, action));
    case actionTypes.SET_MOVIES:
      return updateObject(state, setMovies(state, action));
    case actionTypes.REMOVE_MOVIE:
      return updateObject(state, removeMovie(state, action));
    case actionTypes.CHANGE_PREVIEW:
      return updateObject(state, changePreview(state, action));
    case actionTypes.ADD_RECENT:
      return updateObject(state, addRecent(state, action));
    case actionTypes.SET_RECENT:
      return updateObject(state, setRecent(state, action));
    default:
      return state;
  }
}

export default watchList;
