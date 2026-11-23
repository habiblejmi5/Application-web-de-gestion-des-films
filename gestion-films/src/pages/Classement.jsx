import { useNavigate } from 'react-router-dom'
import FilmCard from '../components/FilmCard.jsx'
import useFilms from '../context/useFilms.js'
import { AFFICHE_DEFAUT, AFFICHES_PAR_GENRE } from '../data/resource.js'

function Classement() {
  const { films } = useFilms()
  const navigate = useNavigate()
  const filmsClassement = films
    .map((film) => ({
      ...film,
      affiche: film.affiche || AFFICHES_PAR_GENRE[film.genre] || AFFICHE_DEFAUT,
    }))
    .sort((filmA, filmB) => (
      Number(filmB.note) - Number(filmA.note)
      || filmA.titre.localeCompare(filmB.titre, 'fr')
    ))

  function handleModifier(film) {
    navigate(`/films/modifier/${film.id}`)
  }

  return (
    <section className="catalog-page">
      <div className="catalog-heading">
        <div>
          <p className="eyebrow"><span /> CLASSEMENT</p>
          <h1>Les mieux notés</h1>
          <p className="catalog-description">
            Retrouvez les films classés par note, du mieux noté au moins bien noté.
          </p>
        </div>
        <p className="film-count">
          <strong>{filmsClassement.length.toString().padStart(2, '0')}</strong>
          <span>FILM{filmsClassement.length > 1 ? 'S' : ''}</span>
        </p>
      </div>

      {filmsClassement.length > 0 ? (
        <div className="film-grid">
          {filmsClassement.map((film, index) => (
            <FilmCard
              key={film.id}
              film={film}
              rang={index + 1}
              onModifier={handleModifier}
            />
          ))}
        </div>
      ) : (
        <div className="no-results" role="status">
          <h2>Aucun film à classer</h2>
          <p>Ajoutez des films pour voir leur classement par note.</p>
        </div>
      )}
    </section>
  )
}

export default Classement
