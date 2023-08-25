/* eslint-disable react-hooks/exhaustive-deps */
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


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
        if (width >= 1280) {
          newInitialQuantityFilms = 16;
        } else if (width >= 768) {
          newInitialQuantityFilms = 8;
        } else if (width >= 280 && width <= 768) {
          newInitialQuantityFilms = 5;
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

    if (width >= 1280) {
      addCards = 4;
    } else if (width >= 768) {
      addCards = 2;
    } else if (width >= 280 && width <= 480) {
      addCards = 2;
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