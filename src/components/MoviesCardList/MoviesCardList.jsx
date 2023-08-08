import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList() {
  const { pathname } = useLocation();

  return (
    <section className="cards">
      <ul className="cards__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className={`cards__more-btn ${pathname !== "/saved-movies" ? "" : "cards__more-btn_type_none"}`} type="button">Еще</button>
    </section>
  );
};

export default MoviesCardList;