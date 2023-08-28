/* eslint-disable react-hooks/exhaustive-deps */
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function MoviesCard({
  film,
  movies,
  handleSaveFilm,
  handleDeleteMovie,
  saveMovies,
  filteredSaveMovies
}) {
  const { pathname } = useLocation();
  const imageUrl = pathname === "/movies" ? `https://api.nomoreparties.co${film.image.url}` : `${film.image}`;
  const [isSavedFilm, setIsSavedFilm] = useState(false);

 useEffect(() => {
    setIsSavedFilm(saveMovies.some((i) => i.movieId === film.id))
  }, [saveMovies, film.id]);

  function handleSaveMovies() {
    if(isSavedFilm) {
      handleDeleteMovie(saveMovies.filter((i) => i.movieId === film.id)[0]);
      setIsSavedFilm(false);
    } else {
      handleSaveFilm(film);
      //setIsSavedFilm(true);
    }
  };

  function handleDelMovies() {
    handleDeleteMovie(film);
  };

  function transformDuration() {
    const hours = Math.trunc(film.duration / 60);
    const minutes = film.duration % 60;
    if(hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  };
  
  return (
    <article className="card">
      <div className="card__element">
        <a className="card__trailerlink" href={film.trailerLink} target="_blank" rel="noreferrer">
          <img className="card__img" src={imageUrl} alt={film.nameRU} />
        </a>
        <div className="card__info">
          <h2 className="card__title">{film.nameRU}</h2>
          {pathname === "/movies"  
            ? <button
                className={`card__btn-save ${isSavedFilm ? "card__btn-save_type_like" : ""}`}
                onClick={handleSaveMovies}
                type="button">
              </button>
            : <button className="card__btn-delete" onClick={handleDelMovies} type="button"></button>
          }
        </div>
        <p className="card__duration">{transformDuration()}</p>
      </div>
    </article>
  );
};

export default MoviesCard;