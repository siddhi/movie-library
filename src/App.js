import React from 'react';
import 'bulma/css/bulma.css';
import MovieTable from './components/MovieTable';
import movieList from './movies.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: movieList
    }
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <MovieTable movies={this.state.movies} />
          </div>
          <div className="column">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
