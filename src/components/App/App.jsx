/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import filterMovies from "../../utils/utils";
import moviesApi from "../../utils/MoviesApi";
import InfoTooltip from "../InfoTooltip/InfoTooltop";
import { ERROR_VALIDATION_MSG, MAX_DURATION_SHORT_FILM } from '../../utils/constants';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [renderFilms, setRenderFilms] = useState([]); //массив всех фильмов
  const [saveMovies, setSaveMovies] = useState([]); //массив сохраненных фильмов
  const [checkbox, setCheckbox] = useState(false); //чекбокс
  const [saveCheckbox, setSaveCheckbox] = useState(false)// чекбокс сохраненных фильмов
  const [filteredMovies, setFilteredMovies] = useState([]); //фильтрация массива всех фильмов
  const [filteredSaveMovies, setFilteredSaveMovies] = useState([]); //фильтрация массива сохраненных фильмов
  const [searchStr, setSearchStr] = useState(""); //поиск в фильмах
  const [searchSaveStr, setSearchSaveStr] = useState(""); //поиск в сохраненных фильмах
  const [registrationError, setRegistrationError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorUpdateInfoUser, setErrorUpdateInfoUser] = useState("");
  const [notFound, setNotFound] = useState(true);
  const [notSaveFound, setNotSaveFound] = useState(true)
  const [resultMessage, setResultMessage] = useState("");
  const [resultSaveMessage, setResultSaveMessage] = useState("");
  const [resultErrorMessage, setResultErrorMessage] = useState("");

  useEffect(() => {
    checkToken();
  }, []);

  //Получение данных о пользователе и фильмах
  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      mainApi
        .getAllInfo()
        .then(([data, film]) => {
          setCurrentUser(data);
          setSaveMovies(film.filter((newFilm) => newFilm.owner === currentUser._id));
          setRenderFilms(JSON.parse(localStorage.getItem("allMovies")) || []);
          setSearchStr((localStorage.getItem("searchString")) || "");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
      }
  }, [isLoggedIn, currentUser._id]);

  
  //АВТОРИЗАЦИЯ

  //регистрация
  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .then(() => {
        setIsSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setRegistrationError(err);
        setIsSuccessful(false);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      })
  };

  //логин
  function handleLogin(email, password) {
    setLoginError("");
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          checkToken();
          setIsLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setIsSuccessful(false);
        setLoginError(err);
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
      })
  };

  //выход из аккаунта
  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("searchString");
    navigate("/", { replace: true });
  };

  //проверка токена
  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .getContent(token)
        .then((res) => {
          if (res) {
            //setCurrentUser(res);
            setIsLoggedIn(true);
            navigate(pathname, { replace: true });
          }
        })
        .catch((err) => {
          if(err.includes(401)) {
            setIsLoggedIn(false);
            localStorage.clear();
            console.log(err);
          }
        });
    };
  };

  //Обновление профиля
  function handleUpdateUser(newUserInfo) {
    setErrorUpdateInfoUser("");
    setIsLoading(true);
    mainApi
      .editUserProfile(newUserInfo)
      .then((res) => {
        setCurrentUser(res);
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessful(true);
      })
      .catch((err) => {
        setErrorUpdateInfoUser(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  function closeAllPopups() {
    setIsInfoTooltipPopupOpen(false)
  };

  //ФИЛЬМЫ

  //Получаем список всех фильмов
  const getAllFilms = async () => {
    try {
      setIsLoading(true);
      const allMovies = await moviesApi.getAllMovies();
      localStorage.setItem("allMovies", JSON.stringify(allMovies));
      setRenderFilms(allMovies);
      setResultErrorMessage("");
      setIsLoading(false);
    } catch (err) {
      setNotFound(false);
      setResultErrorMessage(ERROR_VALIDATION_MSG.SERVER_ERROR_SEARCH);
      console.log(err);
      setIsLoading(false);
    }
  };

  //поиск на странице фильмов
  function handleSearchFilms() {
    if (!renderFilms.length) {
      return []
    }

    const searchedMovies = filterMovies(searchStr, renderFilms);
    const searchedShortMovies = searchedMovies.filter((film) => film.duration <= MAX_DURATION_SHORT_FILM);

      
      if (checkbox) {
        localStorage.setItem("checkbox", checkbox);
        setFilteredMovies(searchedShortMovies);
        if (searchedShortMovies.length === 0) {
          setNotFound(false);
          setResultMessage(ERROR_VALIDATION_MSG.NOTHING_SEARCHED);
        } else {
          setResultMessage("");
          setNotFound(true);
        }
      } else {
        setFilteredMovies(searchedMovies);
        if (searchedMovies.length === 0) {
          setNotFound(false);
          setResultMessage(ERROR_VALIDATION_MSG.NOTHING_SEARCHED);
        } else {
          setResultMessage("");
          setNotFound(true);
        }
      }
  }

  const submitHandleAllFilms = (searchStr) => {
    if (!renderFilms.length) {
      getAllFilms();
    }
    setSearchStr(searchStr);
    localStorage.setItem("searchString", searchStr);
  }

  useEffect(() => {
      handleSearchFilms();
      handleSaveSearchFilms();
  }, [renderFilms, saveMovies, searchStr, searchSaveStr, checkbox, saveCheckbox]);


  //Фильтр поиска в сохраненных фильмах
  function handleSaveSearchFilms() {
    if (!saveMovies.length) {
      setFilteredSaveMovies([]);
      return
    }
    const searchedMovies = filterMovies(searchSaveStr, saveMovies);
    const searchedShortMovies = searchedMovies.filter((film) => film.duration <= MAX_DURATION_SHORT_FILM);

      
      if (saveCheckbox) {
        localStorage.setItem("saveCheckbox", saveCheckbox);
        setFilteredSaveMovies(searchedShortMovies);
        if (searchedShortMovies.length === 0) {
          setNotSaveFound(false);
          setResultSaveMessage(ERROR_VALIDATION_MSG.NOTHING_SEARCHED);
        } else {
          setResultSaveMessage("");
          setNotSaveFound(true);
        }
      } else {
        setFilteredSaveMovies(searchedMovies);
        if (searchedMovies.length === 0) {
          setNotSaveFound(false);
          setResultSaveMessage(ERROR_VALIDATION_MSG.NOTHING_SEARCHED);
        } else {
          setResultSaveMessage("");
          setNotSaveFound(true);
        }
      }
  };

  const submitHandler = (searchStr) => {
    setSearchSaveStr(searchStr);
  };

    //Чекбокс
    function handleCheckboxClick() {
      setCheckbox(prev => !prev);
    };

    function handleSaveCheckboxClick() {
      setSaveCheckbox(prev => !prev);
    };

  //Сохранение фильма
  const handleSaveFilm = (data) => {
    mainApi
      .createMovies(data)
      .then((newFilm) => {
        setSaveMovies([newFilm, ...saveMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Удаление фильма
  function handleFilmDel(film) {
    mainApi
      .deleteMovies(film._id)
      .then(() => {
        const saveFilms = saveMovies.filter((m) => m._id !== film._id);
        console.log(saveFilms);
        setSaveMovies(saveFilms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile" ?
          <Header isLoggedIn={isLoggedIn} /> : ""}
        <main className="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  element={Movies}
                  submitHandleAllFilms={submitHandleAllFilms}
                  renderFilms={filteredMovies}
                  handleCheckboxClick={handleCheckboxClick}
                  handleSaveFilm={handleSaveFilm}
                  handleDeleteMovie={handleFilmDel}
                  saveMovies={saveMovies}
                  checkbox={checkbox}
                  setCheckbox={setCheckbox}
                  resultMessage={resultMessage}
                  resultErrorMessage={resultErrorMessage}
                  notFound={notFound}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                  element={SavedMovies}
                  movies={filteredSaveMovies}
                  filteredSaveMovies={filteredSaveMovies}
                  saveMovies={saveMovies}
                  handleCheckboxClick={handleSaveCheckboxClick}
                  submitHandler={submitHandler}
                  handleDeleteMovie={handleFilmDel}
                  checkbox={saveCheckbox}
                  setCheckbox={setSaveCheckbox}
                  setSearchStr={setSearchSaveStr}
                  resultSaveMessage={resultSaveMessage}
                  notSaveFound={notSaveFound}
                />
              } 
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Profile}
                  onLogout={handleLogout}
                  onUpdateUserProfile={handleUpdateUser}
                  buttonText={isLoading ? "Сохранение..." : "Сохранить"}
                  errorUpdateInfoUser={errorUpdateInfoUser}
                />
              } 
            />
            <Route path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : ( <Register onRegister={handleRegister} />
              )}
            />
            <Route path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : ( <Login onLogin={handleLogin} isLoading={isLoading} />
              )} 
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        {pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" ? <Footer /> : ""}
        <InfoTooltip
          onClose={closeAllPopups}
          isSuccessful={isSuccessful}
          isOpen={isInfoTooltipPopupOpen}
          registrationError={registrationError}
          loginError={loginError}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;