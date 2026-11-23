import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import FilmCard from '../components/FilmCard.jsx'
import FilmFormModal from '../components/FilmFormModal.jsx'
import useFilms from '../context/useFilms.js'
import {
  AFFICHE_DEFAUT,
  AFFICHES_PAR_GENRE,
  FILMS_INITIAUX,
  GENRES,
} from '../data/resource.js'

function Films({ modeInitial }) {
  const { films, enregistrerFilm } = useFilms()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const [recherche, setRecherche] = useState('')
  const [genreSelectionne, setGenreSelectionne] = useState('')
  const filmsDisponibles = films ?? FILMS_INITIAUX
  const filmsAvecAffiches = filmsDisponibles.map((film) => ({
    ...film,
    affiche: film.affiche || AFFICHES_PAR_GENRE[film.genre] || AFFICHE_DEFAUT,
  }))
  const filmEnEdition = modeInitial === 'ajout'
    ? {}
    : modeInitial === 'modification'
      ? filmsAvecAffiches.find((filmActuel) => String(filmActuel.id) === id) ?? null
      : null
  const messageConfirmation = location.state?.confirmation
    || (modeInitial === 'modification' && !filmEnEdition ? 'Film introuvable.' : '')

  const filmsFiltres = filmsAvecAffiches.filter((film) => {
    const titreCorrespond = film.titre.toLocaleLowerCase('fr').includes(recherche.trim().toLocaleLowerCase('fr'))
    const genreCorrespond = genreSelectionne === '' || film.genre === genreSelectionne
    return titreCorrespond && genreCorrespond
  })

  function handleEnregistrer(payload, estModification) {
    enregistrerFilm(payload, estModification)
    const confirmation =
      estModification
        ? `Le film « ${payload.titre} » a été modifié.`
        : `Le film « ${payload.titre} » a été ajouté.`
    navigate('/films', { replace: true, state: { confirmation } })
  }

  function handleModifier(film) {
    navigate(`/films/modifier/${film.id}`)
  }

  function handleAjouter() {
    navigate('/films/ajouter')
  }

  function handleFermerModal() {
    navigate('/films')
  }

  return (
    <section className="catalog-page">
      <div className="catalog-heading">
        <div>
          <p className="eyebrow"><span /> LA COLLECTION</p>
          <h1>Explorer les films</h1>
          <p className="catalog-description">
            Des classiques aux nouvelles découvertes, trouvez le film qu’il vous faut.
          </p>
        </div>
        <div className="catalog-heading-actions">
          <button className="button button-primary" type="button" onClick={handleAjouter}>
            + Ajouter un film
          </button>
          <p className="film-count">
            <strong>{filmsFiltres.length.toString().padStart(2, '0')}</strong>
            <span>FILM{filmsFiltres.length > 1 ? 'S' : ''}</span>
          </p>
        </div>
      </div>

      {messageConfirmation && (
        <p className="confirmation-message" role="status">{messageConfirmation}</p>
      )}

      <div className="catalog-filters">
        <label className="search-field">
          <span className="visually-hidden">Rechercher un film par titre</span>
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={recherche}
            onChange={(event) => setRecherche(event.target.value)}
            placeholder="Rechercher un titre..."
          />
        </label>
        <label className="genre-field">
          <span className="visually-hidden">Filtrer par genre</span>
          <select
            value={genreSelectionne}
            onChange={(event) => setGenreSelectionne(event.target.value)}
          >
            <option value="">Tous les genres</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </label>
      </div>

      {filmsFiltres.length > 0 ? (
        <div className="film-grid">
          {filmsFiltres.map((film) => (
            <FilmCard key={film.id} film={film} onModifier={handleModifier} />
          ))}
        </div>
      ) : (
        <div className="no-results" role="status">
          <span aria-hidden="true">⌕</span>
          <h2>Aucun film trouvé</h2>
          <p>Essayez un autre titre ou choisissez un genre différent.</p>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              setRecherche('')
              setGenreSelectionne('')
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {filmsFiltres.length > 0 && !recherche.trim() && !genreSelectionne && (
        <p className="catalog-end-message">
          That’s all we have in our library right now. Thanks for visiting — we hope you enjoy exploring!
        </p>
      )}

      {filmEnEdition && (
        <FilmFormModal
          key={filmEnEdition.id ?? 'ajout'}
          filmEnEdition={filmEnEdition}
          genres={GENRES}
          onEnregistrer={handleEnregistrer}
          onFermer={handleFermerModal}
        />
      )}
    </section>
  )
}

export default Films
