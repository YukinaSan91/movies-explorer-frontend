import { Link } from "react-router-dom";
import headerLogo from "../../images/logo.svg";
import "./Form.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Form(props) {
  const {values, handleChange, errors} = useFormAndValidation();

  return (
    <>
      <Link to="/" className="auth__link-logo">
        <img className="auth__img" src={headerLogo} alt="Логотип" />
      </Link>
      <form className="auth__form">
        <h2 className="auth__heading">{props.title}</h2>
        <div className="auth__inputs">
          {props.children}
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
              onChange={handleChange}
              value={values.email || ""}
            />
            <span className="input-email-error auth__error" type="text">{errors.email}</span>
          </label>
          <label className="auth__item">
            <p className="auth__text">Пароль</p>
            <input
              className={`auth__input ${errors.password ? 'auth__input_type_red' : ''}`}
              type="password"
              id="input-password"
              name="password"
              placeholder="Введите Пароль"
              minLength="8"
              maxLength="16"
              required
              onChange={handleChange}
              value={values.password || ""}
            />
            <span className="input-password-error auth__error" type="text">{errors.password}</span>
          </label>
        </div>
      </form></>
  );
};

export default Form;