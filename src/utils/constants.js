const ERROR_VALIDATION_MSG = 
  {
    INCORRECT_ERROR: "Вы ввели неправильный логин или пароль.",
    INVALID_TOKEN: "При авторизации произошла ошибка. Токен не передан или передан не в том формате.",
    INCORR_TOKEN: "При авторизации произошла ошибка. Переданный токен некорректен.",
    USER_EMAIL_EXIST: "Пользователь с таким email уже существует.",
    REGISTRATION_ERROR: "При регистрации пользователя произошла ошибка.",
    UPDATE_PROFILE_ERROR: "При обновлении профиля произошла ошибка.",
    SERVER_ERROR: "500 На сервере произошла ошибка.",
    NOT_FOUND_ERROR: "404 Страница по указанному маршруту не найдена.",
    SEARCH_FORM_ERROR: 'Нужно ввести ключевое слово',
    NOTHING_SEARCHED: "Ничего не найдено",
    SERVER_ERROR_SEARCH: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    UNAUTHORIZED_ERROR: "Ошибка 401",
    CONFLICT_ERROR: "Ошибка 409"
  }

const  INFO_MSG =
  {
    SUCSSESS: 'Все прошло успешно',
    UNSUCSSESS: 'Что-то пошло не так',
    PROFILE_SUCSSESS: "Данные профиля обновлены!",
    REGISTRATION_SUCSSESS: "Вы успешно зарегистрированы!"
  }

const REGEXP_EMAIL = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$";
// eslint-disable-next-line no-useless-escape
const REGEXP_NAME = '^[A-Za-zА-Яа-яЁё\\-\\s]+$';

const MAX_DURATION_SHORT_FILM = 40;
const LAPTOP_WIDTH = 1281;
const SMALL_LAPTOP_WIDTH = 1046;
const MORE_TABLET_WIDTH = 801;
const TABLET_WIDTH = 769;
const SMALL_TABLET_WIDTH = 681;
const MOBILE_WIDTH = 481;
const SMALL_MOBILE_WIDTH = 280;
const EXTRA_LARGE_PAGE_CARDS_COUNT = 16;
const LARGE_PAGE_CARDS_COUNT = 12;
const MEDIUM_PAGE_CARDS_COUNT = 8;
const SMALL_PAGE_CARDS_COUNT = 5;
const EXTRA_LARGE_NEXT_PAGE_CARDS_COUNT = 4;
const LARGE_NEXT_PAGE_CARDS_COUNT = 3;
const MEDIUM_NEXT_PAGE_CARDS_COUNT = 2;
const SMALL_PAGE_AMOUNT = 2;

export  { 
  ERROR_VALIDATION_MSG, 
  INFO_MSG, REGEXP_EMAIL, 
  REGEXP_NAME,
  MAX_DURATION_SHORT_FILM,
  MOBILE_WIDTH,
  LAPTOP_WIDTH,
  SMALL_LAPTOP_WIDTH,
  MORE_TABLET_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  SMALL_MOBILE_WIDTH,
  EXTRA_LARGE_PAGE_CARDS_COUNT,
  LARGE_PAGE_CARDS_COUNT,
  MEDIUM_PAGE_CARDS_COUNT,
  SMALL_PAGE_CARDS_COUNT,
  EXTRA_LARGE_NEXT_PAGE_CARDS_COUNT,
  LARGE_NEXT_PAGE_CARDS_COUNT,
  MEDIUM_NEXT_PAGE_CARDS_COUNT,
  SMALL_PAGE_AMOUNT
};