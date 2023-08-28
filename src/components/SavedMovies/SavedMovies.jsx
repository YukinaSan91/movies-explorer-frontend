/* eslint-disable react-hooks/exhaustive-deps */
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useEffect } from "react";

function SavedMovies({
  isLoading,
  saveMovies,
  filteredSaveMovies,
  movies,
  handleCheckboxClick,
  submitHandler,
  handleDeleteMovie,
  checkbox,
  setCheckbox,
  setSearchStr,
  resultSaveMessage,
  notSaveFound
}) {

  useEffect(() => {
    setSearchStr("");
  }, []);

  return (
    <section className="saved-movies">
      <SearchForm
        handleCheckboxClick={handleCheckboxClick}
        onSubmit={submitHandler}
        setCheckbox={setCheckbox}
        checkbox={checkbox}
      />
      {isLoading ? (
          <Preloader />
        ) : notSaveFound ? (
          <MoviesCardList
            movies={movies}
            saveMovies={saveMovies}
            filteredSaveMovies={filteredSaveMovies}
            handleDeleteMovie={handleDeleteMovie}
          />
        ) : (<span className="saved-movies__search-error saved-movies__search-error_margin">{resultSaveMessage}</span>)
      }
    </section>
  );
};

export default SavedMovies;