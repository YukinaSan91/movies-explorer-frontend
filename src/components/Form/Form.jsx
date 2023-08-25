/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import headerLogo from "../../images/logo.svg";
import "./Form.css";

function Form({ children, title, name, onSubmit }) {

  return (
    <>
      <Link to="/" className="auth__link-logo">
        <img className="auth__img" src={headerLogo} alt="Логотип" />
      </Link>
      <form className="auth__form" name={name} id={name} onSubmit={onSubmit} noValidate>
        <h2 className="auth__heading">{title}</h2>
        {children}
      </form>
    </>
  );
};

export default Form;