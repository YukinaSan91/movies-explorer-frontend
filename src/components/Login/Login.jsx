import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "../Form/Form.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Login() {
  const {isValid} = useFormAndValidation();

  return (
    <section className="auth">
      <Form title="Рады видеть!" />
      <div className="auth__container auth__container_type_login">
        <span className="auth__error auth__error_type_server" type="text"></span>
        <button type="submit" className="auth__btn" disabled={isValid?false:true}>Войти</button>
          <p className="auth__send-text">
            Еще не зарегистрированы?&nbsp;&nbsp;
            <Link to="/signup" className="auth__send-link">
              Регистрация
            </Link>
          </p>
      </div>
    </section>
  );
};

export default Login;