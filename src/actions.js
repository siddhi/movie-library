import MovieApi from './api/MovieApi';

export const loadMoviesAction = () => (dispatch) => {
  dispatch({type: "LOAD_MOVIES"});
  MovieApi.findAll().then((movies) => dispatch({type: "SHOW_MOVIES", value: movies}));
};

export const doSort = (column) => ({type: "SORT_CHANGE", value: column});
export const doFilter = (filter) => ({type: "FILTER_CHANGE", value: filter});
export const gotoNextPage = () => ({type: "NEXT_PAGE"});
export const gotoPrevPage = () => ({type: "PREV_PAGE"});
export const gotoPage = (pageNum) => ({type: "GOTO_PAGE", value: pageNum});

