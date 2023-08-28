/* eslint-disable react-hooks/exhaustive-deps */
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MOBILE_WIDTH,
  LAPTOP_WIDTH,
  SMALL_LAPTOP_WIDTH,
  MORE_TABLET_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  EXTRA_LARGE_PAGE_CARDS_COUNT,
  LARGE_PAGE_CARDS_COUNT,
  MEDIUM_PAGE_CARDS_COUNT,
  SMALL_PAGE_CARDS_COUNT,
  EXTRA_LARGE_NEXT_PAGE_CARDS_COUNT,
  LARGE_NEXT_PAGE_CARDS_COUNT,
  MEDIUM_NEXT_PAGE_CARDS_COUNT,
  SMALL_PAGE_AMOUNT
} from "../../utils/constants";


function MoviesCardList({
  movies = [],
  handleSaveFilm,
  handleDeleteMovie,
  saveMovies,
}) {
  const { pathname } = useLocation();
  const [initialQuantityFilms, setInitialQuantityFilms] = useState(EXTRA_LARGE_PAGE_CARDS_COUNT);
  const [addCard, setAddCard] = useState(EXTRA_LARGE_NEXT_PAGE_CARDS_COUNT)
  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener("resize", function (e) {
    setTimeout((e) => {
      setWidth(window.innerWidth);
    }, 100);
  });

  function handleClickBtnMore() {
    setInitialQuantityFilms(initialQuantityFilms + addCard);
  }

  useEffect(() => {
    if (width < MOBILE_WIDTH) {
      setInitialQuantityFilms(SMALL_PAGE_CARDS_COUNT);
      setAddCard(SMALL_PAGE_AMOUNT);
    } else if (width < SMALL_TABLET_WIDTH) {
      setInitialQuantityFilms(SMALL_PAGE_CARDS_COUNT);
      setAddCard(SMALL_PAGE_AMOUNT);
    } else if (width < TABLET_WIDTH) {
      setInitialQuantityFilms(MEDIUM_PAGE_CARDS_COUNT);
      setAddCard(MEDIUM_NEXT_PAGE_CARDS_COUNT);
    } else if (width < MORE_TABLET_WIDTH) {
      setInitialQuantityFilms(MEDIUM_PAGE_CARDS_COUNT);
      setAddCard(MEDIUM_NEXT_PAGE_CARDS_COUNT);
    } else if (width < SMALL_LAPTOP_WIDTH) {
      setInitialQuantityFilms(LARGE_PAGE_CARDS_COUNT);
      setAddCard(LARGE_NEXT_PAGE_CARDS_COUNT);
    } else if (width < LAPTOP_WIDTH) {
      setInitialQuantityFilms(EXTRA_LARGE_PAGE_CARDS_COUNT);
      setAddCard(EXTRA_LARGE_NEXT_PAGE_CARDS_COUNT);
    }
  }, [width]);

  return (
    <section className="cards">
      <div className="cards__list">
        {movies.slice(0, initialQuantityFilms).map((film) => (
          <MoviesCard 
            film={film}
            key={film._id || film.id}
            handleSaveFilm={handleSaveFilm}
            handleDeleteMovie={handleDeleteMovie}
            movies={movies}
            saveMovies={saveMovies}
          />
          )
        )}
      </div>
      {pathname === "/movies" && initialQuantityFilms < movies.length && (
        <button 
          className="cards__more-btn"
          type="button"
          onClick={handleClickBtnMore}
        >Еще</button>
      )}
    </section>
  );
};

export default MoviesCardList;