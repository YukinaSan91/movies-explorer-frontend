import headerLogo from "../../images/logo.svg";
import burgerMenu from "../../images/menu-icon.svg";
import iconProfile from "../../images/icon-profile.svg";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import NavAuth from "../NavAuth/NavAuth";
import Navigation from "../Navigation/Navigation";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useEffect, useState } from "react";

function Header() {
  const { pathname } = useLocation();
  const [isBurger, setIsBurger] = useState(false);
  const [statusBurgerMenu, setStatusBurgerMenu] = useState(false);

  function handleBurgerMenuClick() {
    setIsBurger(!isBurger);
    setStatusBurgerMenu(!statusBurgerMenu);
    statusBurgerMenu ? enablePageScroll() : disablePageScroll();
  };

  useEffect(() => {
    setIsBurger(false);
  }, [pathname]);

  return (
    <header className={`header ${pathname !== "/" ? "" : "header_type_login"}`}>
      <Link to="/" className="header__link">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
      </Link>
      {pathname !== "/" ? <Navigation /> : <NavAuth />}
      <img
        className={`${pathname !== "/" ? "" : "burger-menu__open"}`}
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
                    pathname !== "/profile"
                      ? ""
                      : "burger-menu__link-active"
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
    </header>
  );
};

export default Header;