import { Link, useNavigate, useParams } from 'react-router-dom'
import useFilms from '../context/useFilms.js'
import { AFFICHE_DEFAUT } from '../data/resource.js'

function FilmDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { films, supprimerFilm } = useFilms()
  const film = films.find((filmActuel) => String(filmActuel.id) === id)

  if (!film) {
    return (
      <section className="film-not-found">
        <p className="eyebrow"><span /> FICHE INDISPONIBLE</p>
        <h1>Film introuvable</h1>
        <Link className="button button-secondary" to="/films">Retour à la liste</Link>
      </section>
    )
  }

  function handleSupprimer() {
    const confirmation = window.confirm(`Voulez-vous vraiment supprimer « ${film.titre} » ?`)
    if (!confirmation) return

    supprimerFilm(film.id)
    navigate('/films', {
      replace: true,
      state: { confirmation: `Le film « ${film.titre} » a été supprimé.` },
    })
  }

  return (
    <section className="film-details-page">
      <Link className="details-back-link" to="/films">← Retour à la liste</Link>
      <article className="film-details">
        <div className="film-details-poster">
          <img
            src={film.affiche || AFFICHE_DEFAUT}
            alt={film.titre}
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = AFFICHE_DEFAUT
            }}
          />
        </div>
        <div className="film-details-content">
          <p className="eyebrow"><span /> {film.genre}</p>
          <h1>{film.titre}</h1>
          <p className="film-details-year">{film.annee} <span>·</span> {film.duree} min</p>
          <dl className="film-details-facts">
            <div>
              <dt>Réalisateur</dt>
              <dd>{film.realisateur}</dd>
            </div>
            <div>
              <dt>Genre</dt>
              <dd>{film.genre}</dd>
            </div>
            <div>
              <dt>Année de sortie</dt>
              <dd>{film.annee}</dd>
            </div>
            <div>
              <dt>Durée</dt>
              <dd>{film.duree} minutes</dd>
            </div>
            <div>
              <dt>Note</dt>
              <dd className="film-details-rating"><span aria-hidden="true">★</span> {film.note.toFixed(1)} / 10</dd>
            </div>
          </dl>
          <div className="film-details-actions">
            <Link className="button button-primary" to={`/films/modifier/${film.id}`}>
              Modifier
            </Link>
            <button className="button button-danger" type="button" onClick={handleSupprimer}>
              Supprimer
            </button>
          </div>
        </div>
      </article>
    </section>
  )
}

export default FilmDetails
