import React from 'react'

function MovieRow({ movie }) {
  return (
    <tr>
      <td>{movie['Title']}</td><td>{movie['Genre']}</td><td>{movie['Rating']}</td>
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
  let sortedMovies = [...movies].sort((a, b) => a[sortField] < b[sortField] ? -1 : 1);
  return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <ColumnHeader name="Title" sorted={sortField === 'Title'} 
              onClick={() => onSort('Title')}
            />
            <ColumnHeader name="Genre" sorted={sortField === 'Genre'} 
              onClick={() => onSort('Genre')}
            />
            <ColumnHeader name="Rating" sorted={sortField === 'Rating'} 
              onClick={() => onSort('Rating')}
            />
          </tr>
        </thead>
        <tbody>
          { sortedMovies.map((movie) => <MovieRow movie={movie} key={movie['Title']}/>) }
        </tbody>
      </table>
  );
}

