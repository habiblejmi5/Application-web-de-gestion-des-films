import { useContext } from 'react'
import FilmsContext from './FilmsContext.js'

function useFilms() {
  const contexte = useContext(FilmsContext)
  if (!contexte) {
    throw new Error('useFilms doit être utilisé dans un FilmsProvider.')
  }
  return contexte
}

export default useFilms
