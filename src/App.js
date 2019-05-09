import React from 'react';
import 'bulma/css/bulma.css';
import MovieTable from './components/MovieTable';
import movieList from './movies.json';

let dedupedMovieList = [];
movieList.forEach((movie) => {
  if (dedupedMovieList.findIndex((m) => m['Title'] === movie['Title']) === -1) {
    dedupedMovieList.push(movie);
  }
});
let cleanedMovieList = dedupedMovieList
  .map((movie) => ({ 
    'Title': movie['Title'], 
    'Genre': movie['Major_Genre'] || 'Unknown', 
    'Rating': movie['IMDB_Rating'] || 0 
  }));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: cleanedMovieList,
      sortField: "Title"
    }
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <MovieTable
              movies={this.state.movies}
              sortField={this.state.sortField}
              onSort={(sortField) => this.setState({sortField})}
            />
          </div>
          <div className="column">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
