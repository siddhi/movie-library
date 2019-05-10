import React from 'react';
import 'bulma/css/bulma.css';
import MovieTable from './components/MovieTable';
import Pagination from './components/Pagination';
import Filter from './components/Filter';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sortField: "Title",
    }
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <Filter onFilter={(filter) => this.setState({filter})} />
            <Pagination perPage={10} dataField="movies">
              <MovieTable />
            </Pagination>
          </div>
          <div className="column">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
