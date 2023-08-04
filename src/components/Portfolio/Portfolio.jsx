import "./Portfolio.css";
import arrowImage from "../../images/icon-portfolio.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-elem">
            <a className="portfolio__link" href="https://github.com/YukinaSan91/how-to-learn" target="_blank" rel="noreferrer">
              Статичный сайт
              <img className="portfolio__img" src={arrowImage} alt="Стрелка" />
            </a>
        </li>
        <li className="portfolio__list-elem">
            <a className="portfolio__link" href="https://github.com/YukinaSan91/russian-travel" target="_blank" rel="noreferrer">
              Адаптивный сайт
              <img className="portfolio__img" src={arrowImage} alt="Стрелка" />
            </a>
        </li>
        <li className="portfolio__list-elem">
            <a className="portfolio__link" href="https://github.com/YukinaSan91/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
              Одностраничное приложение
              <img className="portfolio__img" src={arrowImage} alt="Стрелка" />
            </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;