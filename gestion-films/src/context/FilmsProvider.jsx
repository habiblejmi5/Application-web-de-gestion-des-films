import { useMemo, useState } from 'react'
import FilmsContext from './FilmsContext.js'
import { FILMS_INITIAUX } from '../data/resource.js'

function FilmsProvider({ children }) {
  const [films, setFilms] = useState(FILMS_INITIAUX)

  function enregistrerFilm(filmEnregistre, estModification) {
    if (estModification) {
      setFilms((filmsActuels) => filmsActuels.map((film) => (
        film.id === filmEnregistre.id ? filmEnregistre : film
      )))
      return
    }

    setFilms((filmsActuels) => {
      const nouvelId = Math.max(0, ...filmsActuels.map((film) => film.id)) + 1
      return [...filmsActuels, { ...filmEnregistre, id: nouvelId }]
    })
  }

  function supprimerFilm(id) {
    setFilms((filmsActuels) => filmsActuels.filter((film) => film.id !== id))
  }

  const valeur = useMemo(
    () => ({ films, enregistrerFilm, supprimerFilm }),
    [films],
  )

  return <FilmsContext.Provider value={valeur}>{children}</FilmsContext.Provider>
}

export default FilmsProvider
