import React from 'react';
import 'bulma/css/bulma.css';
import MovieTable from './components/MovieTable';
import Pagination from './components/Pagination';
import Filter from './components/Filter';

function App() {
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <Filter />
          <Pagination perPage={10} dataField="movies">
            {(filteredData) => <MovieTable movies={filteredData}/>}
          </Pagination>
        </div>
        <div className="column">
        </div>
      </div>
    </div>
  );
}

export default App;
