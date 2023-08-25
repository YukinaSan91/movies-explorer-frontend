export default function filterMovies(searchStr, moviesArr) {
  return moviesArr.filter((film) =>
    film.nameRU.toLowerCase().includes(searchStr.toLowerCase()) ||
    film.nameEN.toLowerCase().includes(searchStr.toLowerCase())
  );
};
