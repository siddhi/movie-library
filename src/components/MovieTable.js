import React from 'react'

function MovieRow({ movie }) {
  return (
    <tr>
      <td>{movie['Title']}</td><td>{movie['Major_Genre']}</td><td>{movie['IMDB_Rating']}</td>
    </tr>
  );
}

export default function MovieTable({ movies, sortField }) {
  let sortedMovies = [...movies].sort((a, b) => a[sortField] < b[sortField] ? -1 : 1);
  return (
      <table className="table is-fullwidth">
        <thead>
          <tr><td>Title</td><td>Genre</td><td>Rating</td></tr>
        </thead>
        <tbody>
          { sortedMovies.map((movie) => <MovieRow movie={movie} />) }
        </tbody>
      </table>
  );
}

MovieTable.defaultProps = {
  sortField: 'Title'
}
