import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "../Form/Form.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { REGEXP_EMAIL } from "../../utils/constants";

function Login({ onLogin }) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    const { email, password } = values;
    onLogin(email, password);
    resetForm();
  }

  return (
    <section className="auth">
      <Form
        name="login"
        title="Рады видеть!"
        onSubmit={handleLoginSubmit}
        isValid={isValid}
      >
        <div className="auth__inputs">
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
            <span className="input-email-error auth__error" type="text">
              {errors.email}
            </span>
          </label>
          <label className="auth__item">
            <p className="auth__text">Пароль</p>
            <input
              className={`auth__input ${
                errors.password ? "auth__input_type_red" : ""
              }`}
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
            <span className="input-password-error auth__error" type="text">
              {errors.password}
            </span>
          </label>
        </div>
        <div className="auth__container auth__container_type_login">
          <button
            type="submit"
            className={`auth__btn ${isValid ? "" : "auth__btn_disabled"}`}
            disabled={!isValid}
          >
            Войти
          </button>
          <p className="auth__send-text">
            Еще не зарегистрированы?&nbsp;&nbsp;
            <Link to="/signup" className="auth__send-link">
              Регистрация
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
};

export default Login;