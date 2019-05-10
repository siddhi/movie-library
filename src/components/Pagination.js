import React from 'react';
import { connect } from 'react-redux';
import { moviesSelector } from '../store'
import { gotoPrevPage, gotoNextPage, gotoPage } from '../actions'

function Pagination({children, data, dataField, pageNum, perPage, onPrevPage, onNextPage, onGotoPage}) {
  let props = {};
  props[dataField] = data.slice((pageNum-1)*perPage, pageNum*perPage);
  let childElement = React.cloneElement(children, props);
  let totalPages = Math.ceil(data.length / perPage);
  return (
    <div>
      { childElement }
      <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
        <a class="pagination-previous" onClick={onPrevPage}>Previous</a>
        <a class="pagination-next" onClick={() => onNextPage(pageNum, totalPages)}>Next page</a>
      </nav>
    </div>
  );
}

export default connect((state, ownProps) => ({
  data: moviesSelector(state),
  pageNum: state.pageNum,
}), (dispatch) => ({
  onPrevPage: () => dispatch(gotoPrevPage()),
  onNextPage: (pageNum, totalPages) => {
    if (pageNum < totalPages) {
      dispatch(gotoNextPage())
    }
  },
  onGotoPage: (pageNum, totalPages) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      dispatch(gotoPage(pageNum))
    }
  },
}))(Pagination);
