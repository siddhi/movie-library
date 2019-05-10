import React from 'react';
import { connect } from 'react-redux';
import { moviesSelector } from '../store'
import { gotoPrevPage, gotoNextPage, gotoPage } from '../actions'

function PaginationButton({ page, totalPages, currentPage, onGotoPage }) {
  return (
    <li><a className={"pagination-link " + (page === currentPage ? "is-current" : "")} 
           aria-label={"Goto page " + page} 
           onClick={() => onGotoPage(page, totalPages)}>{page}</a></li>
  );
}

function PaginationEllipsis() {
  return (
    <li><span className="pagination-ellipsis">&hellip;</span></li>
  );
}

function PreEllipsis({ currentPage, totalPages, onGotoPage }) {
  return (
    <React.Fragment>
      <PaginationButton page={1} totalPages={totalPages} currentPage={currentPage} onGotoPage={onGotoPage} />
      <PaginationEllipsis />
    </React.Fragment>
  )
}

function PostEllipsis({ currentPage, totalPages, onGotoPage }) {
  return (
    <React.Fragment>
      <PaginationEllipsis />
      <PaginationButton page={totalPages} totalPages={totalPages} currentPage={currentPage} onGotoPage={onGotoPage} />
    </React.Fragment>
  )
}

function Pagination({children: renderProp, data, pageNum, perPage, onPrevPage, onNextPage, onGotoPage}) {
  let getPageRange = (pageNum, totalPages) => {
    let start = pageNum - 2 < 1 ? 1 : pageNum - 2;
    let end = pageNum + 2 >= totalPages ? totalPages : pageNum + 2;
    let range = [];
    for(let i=start; i<=end; i++) {
      range.push(i);
    }
    return range;
  };

  let filteredData = data.slice((pageNum-1)*perPage, pageNum*perPage);
  let totalPages = Math.ceil(data.length / perPage);
  let pageRange = getPageRange(pageNum, totalPages);
  return (
    <div>
      { renderProp(filteredData) }
      <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
        <a className="pagination-previous" onClick={onPrevPage}>&laquo;</a>
        <a className="pagination-next" onClick={() => onNextPage(pageNum, totalPages)}>&raquo;</a>
        <ul className="pagination-list">
          { pageNum > 3 ? <PreEllipsis currentPage={pageNum} totalPages={totalPages} onGotoPage={onGotoPage} /> : null }
          { pageRange.map((page) => <PaginationButton 
                                      key={page}
                                      page={page} 
                                      totalPages={totalPages} 
                                      currentPage={pageNum}
                                      onGotoPage={onGotoPage} />) }
          { pageNum <= totalPages - 3 ? <PostEllipsis currentPage={pageNum} totalPages={totalPages} onGotoPage={onGotoPage} /> : null }
        </ul>
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
