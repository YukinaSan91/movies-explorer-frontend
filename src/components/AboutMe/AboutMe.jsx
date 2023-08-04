import "./AboutMe.css";
import avatar from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена 
            и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;еще увлекаюсь бегом. Недавно начал кодить. С
            2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошел курс по&nbsp;веб-
            разработке, начал заниматься фриланс-заказами и&nbsp;ушел с&nbsp;постоянной работы.
          </p>
          <a href="https://github.com/YukinaSan91" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="about-me__avatar" src={avatar} alt="Аватар" />
      </div>
    </section>
  );
};

export default AboutMe;