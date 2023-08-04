import promoLogo from "../../images/promo-logo.svg";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__logo" src={promoLogo} alt="Спираль" />
    </section>
  );
};

export default Promo;