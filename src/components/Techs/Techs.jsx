import "../Techs/Techs.css";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__content">
          <h3 className="techs__title-info">7 технологий</h3>
          <p className="techs__text">
            На курсе веб&#8208;разработки мы освоили технологии, которые
            применили в дипломном проекте.
          </p>
          <ul className="techs__list">
            <li className="techs__list-elem">HTML</li>
            <li className="techs__list-elem">CSS</li>
            <li className="techs__list-elem">JS</li>
            <li className="techs__list-elem">React</li>
            <li className="techs__list-elem">Git</li>
            <li className="techs__list-elem">Express.js</li>
            <li className="techs__list-elem">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Techs;