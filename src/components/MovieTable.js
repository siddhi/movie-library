import React from 'react'

function MovieRow({ movie, fields }) {
  return (
    <tr>
      { fields.map(field => <td key={movie[field]}>{movie[field]}</td>) }
    </tr>
  );
}

function SortIcon() {
  return (
    <span className="icon">
      <i className="fas fa-sort-down"></i>
    </span>
  )
}

function ColumnHeader({ name, sorted, onClick }) {
  return (
    <td onClick={onClick}>{ name } { sorted ? <SortIcon /> : null }</td>
  );  
}


export default function MovieTable({ movies, sortField, onSort }) {
  let createColumnHeader = (field) => (
    <ColumnHeader name={field} sorted={sortField === field} onClick={() => onSort(field)} key={field} />
  );
  let fields = ['Title', 'Genre', 'Rating'];
  let sortedMovies = [...movies].sort((a, b) => a[sortField] < b[sortField] ? -1 : 1);
  
  return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            { fields.map((fieldName) => createColumnHeader(fieldName)) }
          </tr>
        </thead>
        <tbody>
          { sortedMovies.map((movie) => <MovieRow movie={movie} key={movie['Title']} fields={fields}/>) }
        </tbody>
      </table>
  );
}

