import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "../Form/Form.css";

function Register() {
  return (
    <section className="auth">
      <Form title="Добро пожаловать!">
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
          />
          <span className="input-name-error auth__error" type="text"></span>
        </label>
      </Form>
      <div className="auth__container">
        <span className="auth__error auth__error_type_server" type="text"></span>
        <button type="submit" className="auth__btn">Зарегистрироваться</button>
          <p className="auth__send-text">
            Уже зарегистрированы?&nbsp;&nbsp;
            <Link to="/signin" className="auth__send-link">
              Войти
            </Link>
          </p>
      </div>
    </section>
  );
};

export default Register;