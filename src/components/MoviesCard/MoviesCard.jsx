import "./MoviesCard.css";
import movieImage from "../../images/movie-img.jpg";
import { useLocation } from "react-router-dom";

function MoviesCard() {
  const { pathname } = useLocation();

  return (
    <li className="card">
      <div className="card__element">
        <img className="card__img" src={movieImage} alt="кадр из фильма" />
        <div className="card__info">
          <h2 className="card__title">33 слова о дизайне</h2>
          {pathname === "/saved-movies" 
            ? <button className="card__btn-delete" type="button"></button>
            : <button className="card__btn-save" type="submit"></button>}
        </div>
        <p className="card__duration">1ч&#160;42м</p>
      </div>
    </li>
  );
};

export default MoviesCard;