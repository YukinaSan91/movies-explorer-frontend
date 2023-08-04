import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import iconProfile from "../../images/icon-profile.svg";

function Navigation() {
  const { pathname } = useLocation();

  return (
    <nav className="navigate">
      <ul className="navigate__list">
        <li className="navigate__list-elem">
          <Link to="/movies" className={`navigate__link ${pathname !== "/movies" ? "" : "navigate__link_type_weight"}`}>
            Фильмы
          </Link>
        </li>
        <li className="navigate__list-elem">
          <Link to="/saved-movies" className={`navigate__link ${pathname !== "/saved-movies" ? "" : "navigate__link_type_weight"}`}>
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <div className="navigate__container">
        <Link to="/profile" className={`navigate__link ${pathname !== "/profile" ? "" : "navigate__link_type_weight"}`}>
            Аккаунт
          <div className="navigate__img">
            <img className="navigate__img-elem" src={iconProfile} alt="Аккаунт" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;