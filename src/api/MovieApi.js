import movies from '../movies.json';

let dedupedMovieList = [];
movies.forEach((movie) => {
  if (dedupedMovieList.findIndex((m) => m['Title'] === movie['Title']) === -1) {
    dedupedMovieList.push(movie);
  }
});
let cleanedMovieList = dedupedMovieList
  .map((movie) => ({ 
    'Title': String(movie['Title']), 
    'Genre': movie['Major_Genre'] || 'Unknown', 
    'Rating': movie['IMDB_Rating'] || 0 
}));

let MovieApi = {
  findAll() {
    return new Promise((resolve, reject) => setTimeout(() => resolve(cleanedMovieList), 2000));
  },

  findOne(title) {
    return new Promise((resolve, reject) => setTimeout(() => {
      let movie = cleanedMovieList.filter((movie) => movie['Title'] === title);
      resolve(movie);
    }, 500));
  }
}

export default MovieApi;
