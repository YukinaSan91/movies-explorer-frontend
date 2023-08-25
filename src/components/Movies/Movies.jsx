import "./Movies.css"
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";


function Movies({
  isLoading,
  submitHandleAllFilms,
  renderFilms,
  handleCheckboxClick,
  handleSaveFilm,
  handleDeleteMovie,
  saveMovies,
  checkbox,
  setCheckbox,
  resultMessage,
  notFaund
}) {

  console.log(notFaund);
  return (
    <section className="movies">
      <SearchForm
        onSubmit={submitHandleAllFilms}
        handleCheckboxClick={handleCheckboxClick}
        setCheckbox={setCheckbox}
        checkbox={checkbox}
      />
      {isLoading ? (
          <Preloader />
        ) : (notFaund ? (
          <MoviesCardList
            movies={renderFilms}
            handleSaveFilm={handleSaveFilm}
            handleDeleteMovie={handleDeleteMovie}
            saveMovies={saveMovies}
          />
      ) : (<span className="movies__search-error movies__search-error_margin">{resultMessage}</span>))
    }
    </section>
  );
};

export default Movies;