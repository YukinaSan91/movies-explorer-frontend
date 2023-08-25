/* eslint-disable react-hooks/exhaustive-deps */
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MOBILE_WIDTH,
  LAPTOP_WIDTH,
  TABLET_WIDTH,
  SMALL_MOBILE_WIDTH,
  LARGE_PAGE_CARDS_COUNT,
  LARGE_NEXT_PAGE_CARDS_COUNT,
  MEDIUM_PAGE_CARDS_COUNT,
  MEDIUM_NEXT_PAGE_CARDS_COUNT,
  SMALL_PAGE_CARDS_COUNT,
  ADDING_PAGE_AMOUNT
} from "../../utils/constants";


function MoviesCardList({
  movies = [],
  handleSaveFilm,
  handleDeleteMovie,
  saveMovies,
}) {
  const { pathname } = useLocation();
  const [initialQuantityFilms, setInitialQuantityFilms] = useState(0);

  useEffect(() => {
    function getWidthBrowser() {
      const width = window.innerWidth;
      let newInitialQuantityFilms = 0;

      if (pathname === "/movies") {
        if (width >= LAPTOP_WIDTH) {
          newInitialQuantityFilms = LARGE_PAGE_CARDS_COUNT;
        } else if (width >= TABLET_WIDTH) {
          newInitialQuantityFilms = MEDIUM_PAGE_CARDS_COUNT;
        } else if (width >= SMALL_MOBILE_WIDTH && width <= TABLET_WIDTH) {
          newInitialQuantityFilms = SMALL_PAGE_CARDS_COUNT;
        }
      } 
      else {
        newInitialQuantityFilms = movies.length;
      }

      setInitialQuantityFilms(newInitialQuantityFilms);
    };

    window.addEventListener("resize", getWidthBrowser);
    getWidthBrowser();

    return () => {
      window.removeEventListener("resize", getWidthBrowser);
    };
  }, [movies.length, pathname]);

  function handleClickBtnMore() {
    const width = window.innerWidth;
    let addCards = 0;

    if (width >= LAPTOP_WIDTH) {
      addCards = LARGE_NEXT_PAGE_CARDS_COUNT;
    } else if (width >= TABLET_WIDTH) {
      addCards = MEDIUM_NEXT_PAGE_CARDS_COUNT;
    } else if (width >= SMALL_MOBILE_WIDTH && width <= MOBILE_WIDTH) {
      addCards = ADDING_PAGE_AMOUNT;
    }

    setInitialQuantityFilms((viewInitialQuantityFilms) => {
      const newInitialQuantityFilms = viewInitialQuantityFilms + addCards;
      return newInitialQuantityFilms;
    });
  };

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