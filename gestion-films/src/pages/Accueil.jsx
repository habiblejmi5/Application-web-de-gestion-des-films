function Accueil() {
  return (
    <section className="home-page">
      <div className="home-copy">
        <p className="eyebrow"><span /> LE CINÉMA, À PORTÉE DE MAIN</p>
        <h1>Les histoires qui restent <em>avec vous.</em></h1>
        <p className="home-description">
          Retrouvez vos films préférés, découvrez de nouveaux univers et
          choisissez votre prochaine séance.
        </p>
        <a className="button button-primary" href="/films">
          Explorer les films <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="home-art" aria-hidden="true">
        <div className="art-glow" />
        <div className="art-poster art-poster-back">
          <span>UNE HISTOIRE<br />À DÉCOUVRIR</span>
        </div>
        <div className="art-poster art-poster-front">
          <span className="art-star">✳</span>
          <span>LE GRAND<br />ÉCRAN</span>
          <small>VOTRE PROCHAIN FILM</small>
        </div>
      </div>
    </section>
  )
}

export default Accueil
