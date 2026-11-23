import { Link } from 'react-router-dom'
import { AFFICHE_DEFAUT } from '../data/resource.js'

function FilmCard({ film, onModifier, rang }) {
  return (
    <article className="film-card">
      <Link
        className="film-card-poster"
        to={`/films/${film.id}`}
        aria-label={`Voir les détails de ${film.titre}`}
      >
        <img
          src={film.affiche || AFFICHE_DEFAUT}
          alt={film.titre}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = AFFICHE_DEFAUT
          }}
        />
        {rang !== undefined && (
          <span className="film-rank" aria-label={`Position ${rang} au classement`}>
            #{rang}
          </span>
        )}
        <span className="film-rating" aria-label={`Note : ${film.note} sur 10`}>
          <span aria-hidden="true">★</span> {film.note.toFixed(1)}
        </span>
      </Link>
      <div className="film-card-content">
        <div className="film-card-meta">
          <span>{film.genre}</span>
          <span>{film.annee}</span>
        </div>
        <h2><Link className="film-title-link" to={`/films/${film.id}`}>{film.titre}</Link></h2>
        <div className="film-card-actions">
          <Link className="details-link" to={`/films/${film.id}`}>
            Voir les détails <span aria-hidden="true">↗</span>
          </Link>
          <button
            className="film-edit-button"
            type="button"
            onClick={() => onModifier(film)}
          >
            Modifier
          </button>
        </div>
      </div>
    </article>
  )
}

export default FilmCard
