import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import iconProfile from "../../images/icon-profile.svg";
import burgerMenu from "../../images/menu-icon.svg";
import { useEffect, useState } from "react";

function Navigation() {
  const { pathname } = useLocation();
  const [isBurger, setIsBurger] = useState(false);
  const [statusBurgerMenu, setStatusBurgerMenu] = useState(false);

  function handleBurgerMenuClick() {
    setIsBurger(!isBurger);
    setStatusBurgerMenu(!statusBurgerMenu);
  };

  useEffect(() => {
    setIsBurger(false);
  }, [pathname]);

  return (
    <div className="navigate">
      <nav className="navigate__content">
        <ul className="navigate__list">
          <li className="navigate__list-elem">
            <Link
              to="/movies"
              className={`navigate__link ${
                pathname !== "/movies" ? "" : "navigate__link_type_weight"
              }`}
            >
              Фильмы
            </Link>
          </li>
          <li className="navigate__list-elem">
            <Link
              to="/saved-movies"
              className={`navigate__link ${
                pathname !== "/saved-movies" ? "" : "navigate__link_type_weight"
              }`}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <div className="navigate__container">
          <Link
            to="/profile"
            className={`navigate__link ${
              pathname !== "/profile" ? "" : "navigate__link_type_weight"
            }`}
          >
            Аккаунт
            <div className="navigate__img">
              <img
                className="navigate__img-elem"
                src={iconProfile}
                alt="Аккаунт"
              />
            </div>
          </Link>
        </div>
      </nav>
      <img
        className="navigate__burger-menu-open"
        src={burgerMenu}
        alt="Меню"
        onClick={handleBurgerMenuClick}
      />

      {isBurger && (
        <>
          <div className="burger__overlay"></div>
          <div className="burger-menu">
            <button
              className="burger-menu__close"
              type="button"
              onClick={handleBurgerMenuClick}
            ></button>
            <nav className="burger-menu__container">
              <ul className="burger-menu__list">
                <li className="burger-menu__list-elem">
                  <Link
                    to="/"
                    className={`burger-menu__link ${
                      pathname !== "/" ? "" : "burger-menu__link-active"
                    }`}
                  >
                    Главная
                  </Link>
                </li>
                <li className="burger-menu__list-elem">
                  <Link
                    to="/movies"
                    className={`burger-menu__link ${
                      pathname !== "/movies" ? "" : "burger-menu__link-active"
                    }`}
                  >
                    Фильмы
                  </Link>
                </li>
                <li className="burger-menu__list-elem">
                  <Link
                    to="/saved-movies"
                    className={`burger-menu__link ${
                      pathname !== "/saved-movies"
                        ? ""
                        : "burger-menu__link-active"
                    }`}
                  >
                    Сохраненные фильмы
                  </Link>
                </li>
              </ul>
              <div className="burger-menu__profile-btn">
                <Link
                  to="/profile"
                  className={`burger-menu__link burger-menu__link_type_btn-profile ${
                    pathname !== "/profile" ? "" : "burger-menu__link-active"
                  }`}
                >
                  Аккаунт
                  <div className="burger-menu__img">
                    <img
                      className="burger-menu__img-elem"
                      src={iconProfile}
                      alt="Аккаунт"
                    />
                  </div>
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Navigation;