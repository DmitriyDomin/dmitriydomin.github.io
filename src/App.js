import './App.css';
import React, {Suspense, useCallback, useEffect} from 'react'
import {connect, useDispatch} from 'react-redux';

import { Route, Switch, Redirect, withRouter  } from 'react-router-dom';
import Aux from "./Hoc/Auxilary";
import Header from "./components/Header/Header"
import * as actions from "./store/actions";
import {TrendingMovies} from "./store/mockBD/movies";

const Browse = React.lazy(() => import('./pages/Browse/Browse'));
const Main = React.lazy(() => import('./pages/Main/Main'));
const Movie = React.lazy(() => import('./pages/Movie/Movie'));
const MyList = React.lazy(() => import('./pages/MyList/MyList'));
const Recent = React.lazy(() => import('./pages/Recent/Recent'));
const TopPicks = React.lazy(() => import('./pages/TopPicks/TopPicks'));

const App = props => {

  const dispatch = useDispatch();

  const onInitMovies = useCallback(() => dispatch(actions.initMovies()), [dispatch]);
  const onInitRecentMovies = useCallback(() => dispatch(actions.initRecentMovies()), [dispatch]);

  useEffect(() => {
    onInitRecentMovies();
    onInitMovies();
  }, [onInitMovies]);

  const routes = (
    <Switch>
      <Route path='/browse' render={ (props) => <Browse { ...props }/> }/>
      <Route path='/movie' render={ (props) => <Movie { ...props }/>} />
      <Route path='/mylist' component={ MyList }/>
      <Route path='/recent' component={ Recent }/>
      <Route path='/toppicks' component={ TopPicks } />
      <Route path='/' exact render={ (props) => <Main { ...props }/> }/>
      <Redirect to='/'/>
    </Switch>
  );

  return (
    <div>
      <Aux>
        <Header> </Header>
        <Suspense fallback={ <p> </p> }>{ routes }</Suspense>
      </Aux>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    movies: state.watchList.movies,
  }
}

export default withRouter(connect(mapStateToProps)(App));
