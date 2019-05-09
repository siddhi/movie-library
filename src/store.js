import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import memoize from './memoize'

let initialState = {
  movies: [],
  sortField: 'Title',
  loading: false,
  filter: ""
};

function movieReducer(state=initialState, action) {
  if (action.type === "LOAD_MOVIES") {
    return {...state, loading: true};
  }
  if (action.type === "SHOW_MOVIES") {
    return {...state, movies: action.value, loading: false};
  }
  if (action.type === "SORT_CHANGE") { 
    return {...state, sortField: action.value};
  }
  if (action.type === "FILTER_CHANGE") {
    return {...state, filter: action.value};
  }
  return state;
}

let doMovieFilter = memoize((movies, filter) => movies.filter((movie) => movie['Title'].includes(filter)));
let doMoviesSort = memoize((movies, sortField) => [...movies].sort((a, b) => a[sortField] < b[sortField] ? -1 : 1));

export function moviesSelector(state) {
  return doMoviesSort(doMovieFilter(state.movies, state.filter), state.sortField);
}

let enhancers = compose(applyMiddleware(thunk, createLogger()),
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default createStore(movieReducer, enhancers);
