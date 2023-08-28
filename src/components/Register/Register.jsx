/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "../Form/Form.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { REGEXP_EMAIL, REGEXP_NAME } from "../../utils/constants";

function Register({ onRegister }) {
  const {values, handleChange, errors, isValid} = useFormAndValidation();

  function handleRegisterSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = values;
    onRegister(name, email, password);
  };

  return (
    <section className="auth">
      <Form
        name="register"
        title="Добро пожаловать!"
        onSubmit={handleRegisterSubmit}
        isValid={isValid}
      >
        <div className="auth__inputs">
          <label className="auth__item">
            <p className="auth__text">Имя</p>
            <input
              className="auth__input"
              type="name"
              id="input-name"
              name="name"
              placeholder="Введите имя"
              minLength="2"
              maxLength="40"
              required
              pattern={REGEXP_NAME}
              onChange={handleChange}
              value={values.name || ""}
              autoComplete="off"
            />
            <span className="input-name-error auth__error" type="text">{errors.name}</span>
          </label>
          <label className="auth__item">
            <p className="auth__text">E-mail</p>
            <input
              id="input-email"
              className="auth__input"
              type="email"
              name="email"
              placeholder="Введите E-mail"
              minLength="8"
              required
              pattern={REGEXP_EMAIL}
              onChange={handleChange}
              value={values.email || ""}
              autoComplete="off"
            />
            <span className="input-email-error auth__error" type="text">{errors.email}</span>
          </label>
          <label className="auth__item">
            <p className="auth__text">Пароль</p>
            <input
              className={`auth__input ${errors.password ? "auth__input_type_red" : ""}`}
              type="password"
              id="input-password"
              name="password"
              placeholder="Введите Пароль"
              minLength="8"
              maxLength="16"
              required
              onChange={handleChange}
              value={values.password || ""}
              autoComplete="off"
            />
            <span className="input-password-error auth__error" type="text">{errors.password}</span>
          </label>
        </div>
        <div className="auth__container">
          <button
            type="submit"
            className={`${isValid ? "auth__btn" : "auth__btn auth__btn_disabled"}`}
            disabled={!isValid}>
              Зарегистрироваться
          </button>
            <p className="auth__send-text">
              Уже зарегистрированы?&nbsp;&nbsp;
              <Link to="/signin" className="auth__send-link">
                Войти
              </Link>
            </p>
        </div>
      </Form>
    </section>
  );
};

export default Register;