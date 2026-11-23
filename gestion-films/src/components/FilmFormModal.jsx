import { useState } from 'react'
import {
  AFFICHE_DEFAUT,
  AFFICHES_DISPONIBLES,
  AFFICHES_PAR_GENRE,
  GENRES,
} from '../data/resource.js'

const ANNEE_ACTUELLE = new Date().getFullYear()

function afficheValide(affiche) {
  if (!affiche || affiche.startsWith('data:image/')) return true

  if (/^[a-z][a-z\d+.-]*:/i.test(affiche)) {
    try {
      const urlAffiche = new URL(affiche)
      return ['http:', 'https:'].includes(urlAffiche.protocol) && Boolean(urlAffiche.hostname)
    } catch {
      return false
    }
  }

  return !affiche.startsWith('//') && !/\s/.test(affiche)
}

function creerFormulaire(film = {}) {
  return {
    titre: film.titre ?? '',
    realisateur: film.realisateur ?? '',
    genre: film.genre ?? '',
    annee: film.annee?.toString() ?? '',
    duree: film.duree?.toString() ?? '',
    note: film.note?.toString() ?? '',
    affiche: film.affiche ?? '',
  }
}

function FilmFormModal({ filmEnEdition, genres = GENRES, onEnregistrer, onFermer }) {
  const [formulaire, setFormulaire] = useState(() => creerFormulaire(filmEnEdition))
  const [erreurs, setErreurs] = useState({})
  const estModification = Boolean(filmEnEdition?.id)
  const presetSelectionne = AFFICHES_DISPONIBLES.find(
    (preset) => preset.affiche === formulaire.affiche,
  )?.id ?? ''
  const afficheApercu = formulaire.affiche
    || AFFICHES_PAR_GENRE[formulaire.genre]
    || AFFICHE_DEFAUT

  function handleChange(event) {
    const { name, value } = event.target
    setFormulaire((formulaireActuel) => ({
      ...formulaireActuel,
      [name]: value,
      ...(name === 'genre' && value && !formulaireActuel.affiche
        ? { affiche: AFFICHES_PAR_GENRE[value] || AFFICHE_DEFAUT }
        : {}),
    }))
    setErreurs((erreursActuelles) => ({ ...erreursActuelles, [name]: '' }))
  }

  function validerFormulaire() {
    const nouvellesErreurs = {}
    const annee = Number(formulaire.annee)
    const duree = Number(formulaire.duree)
    const note = Number(formulaire.note)

    if (!formulaire.titre.trim()) {
      nouvellesErreurs.titre = 'Le titre est obligatoire.'
    }

    if (!formulaire.realisateur.trim()) {
      nouvellesErreurs.realisateur = 'Le réalisateur est obligatoire.'
    }

    if (!formulaire.genre) {
      nouvellesErreurs.genre = 'Veuillez sélectionner un genre.'
    }

    if (
      !formulaire.annee.trim()
      || !Number.isInteger(annee)
      || annee < 1888
      || annee > ANNEE_ACTUELLE
    ) {
      nouvellesErreurs.annee = `L’année doit être comprise entre 1888 et ${ANNEE_ACTUELLE}.`
    }

    if (!formulaire.duree.trim() || !Number.isFinite(duree) || duree <= 0) {
      nouvellesErreurs.duree = 'La durée doit être un nombre strictement positif.'
    }

    if (
      !formulaire.note.trim()
      || !Number.isFinite(note)
      || note < 0
      || note > 10
    ) {
      nouvellesErreurs.note = 'La note doit être comprise entre 0 et 10.'
    }

    if (!afficheValide(formulaire.affiche.trim())) {
      nouvellesErreurs.affiche = 'Saisissez une URL ou un chemin d’image valide.'
    }

    setErreurs(nouvellesErreurs)
    return Object.keys(nouvellesErreurs).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validerFormulaire()) return

    const payload = {
      titre: formulaire.titre.trim(),
      realisateur: formulaire.realisateur.trim(),
      genre: formulaire.genre,
      annee: Number(formulaire.annee),
      duree: Number(formulaire.duree),
      note: Number(formulaire.note),
      affiche: formulaire.affiche.trim()
        || AFFICHES_PAR_GENRE[formulaire.genre]
        || AFFICHE_DEFAUT,
    }

    if (estModification) payload.id = filmEnEdition.id
    onEnregistrer(payload, estModification)
  }

  function handleClicFond(event) {
    if (event.target === event.currentTarget) onFermer()
  }

  function handlePresetChange(event) {
    const preset = AFFICHES_DISPONIBLES.find((option) => option.id === event.target.value)
    setFormulaire((formulaireActuel) => ({
      ...formulaireActuel,
      affiche: preset?.affiche ?? '',
    }))
    setErreurs((erreursActuelles) => ({ ...erreursActuelles, affiche: '' }))
  }

  function handleErreurAffiche(event) {
    const afficheSecours = AFFICHES_PAR_GENRE[formulaire.genre] || AFFICHE_DEFAUT
    event.currentTarget.onerror = null
    event.currentTarget.src = afficheSecours
    setFormulaire((formulaireActuel) => ({
      ...formulaireActuel,
      affiche: afficheSecours,
    }))
  }

  return (
    <div className="modal-backdrop" onClick={handleClicFond}>
      <section
        className="film-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titre-modal-film"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow"><span /> {estModification ? 'MODIFICATION' : 'NOUVEAU FILM'}</p>
            <h2 id="titre-modal-film">{estModification ? 'Modifier le film' : 'Ajouter un film'}</h2>
          </div>
          <button
            className="modal-close"
            type="button"
            onClick={onFermer}
            aria-label="Fermer la fenêtre"
          >
            ×
          </button>
        </div>

        <form className="film-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field form-field-full">
            <label htmlFor="titre">Titre</label>
            <input
              id="titre"
              name="titre"
              type="text"
              value={formulaire.titre}
              onChange={handleChange}
              aria-invalid={Boolean(erreurs.titre)}
              aria-describedby={erreurs.titre ? 'erreur-titre' : undefined}
            />
            {erreurs.titre && <p className="error-msg" id="erreur-titre">{erreurs.titre}</p>}
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="realisateur">Réalisateur</label>
            <input
              id="realisateur"
              name="realisateur"
              type="text"
              value={formulaire.realisateur}
              onChange={handleChange}
              aria-invalid={Boolean(erreurs.realisateur)}
              aria-describedby={erreurs.realisateur ? 'erreur-realisateur' : undefined}
            />
            {erreurs.realisateur && (
              <p className="error-msg" id="erreur-realisateur">{erreurs.realisateur}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={formulaire.genre}
              onChange={handleChange}
              aria-invalid={Boolean(erreurs.genre)}
              aria-describedby={erreurs.genre ? 'erreur-genre' : undefined}
            >
              <option value="">Sélectionner un genre</option>
              {genres.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
            </select>
            {erreurs.genre && <p className="error-msg" id="erreur-genre">{erreurs.genre}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="annee">Année de sortie</label>
            <input
              id="annee"
              name="annee"
              type="number"
              min="1888"
              max={ANNEE_ACTUELLE}
              step="1"
              value={formulaire.annee}
              onChange={handleChange}
              aria-invalid={Boolean(erreurs.annee)}
              aria-describedby={erreurs.annee ? 'erreur-annee' : undefined}
            />
            {erreurs.annee && <p className="error-msg" id="erreur-annee">{erreurs.annee}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="duree">Durée (minutes)</label>
            <input
              id="duree"
              name="duree"
              type="number"
              min="0.01"
              step="any"
              value={formulaire.duree}
              onChange={handleChange}
              aria-invalid={Boolean(erreurs.duree)}
              aria-describedby={erreurs.duree ? 'erreur-duree' : undefined}
            />
            {erreurs.duree && <p className="error-msg" id="erreur-duree">{erreurs.duree}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="note">Note sur 10</label>
            <input
              id="note"
              name="note"
              type="number"
              min="0"
              max="10"
              step="any"
              value={formulaire.note}
              onChange={handleChange}
              aria-invalid={Boolean(erreurs.note)}
              aria-describedby={erreurs.note ? 'erreur-note' : undefined}
            />
            {erreurs.note && <p className="error-msg" id="erreur-note">{erreurs.note}</p>}
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="preset-affiche">Choisir une affiche prédéfinie</label>
            <select
              id="preset-affiche"
              value={presetSelectionne}
              onChange={handlePresetChange}
            >
              <option value="">Aucune — saisir un chemin ou utiliser l’affiche du genre</option>
              {AFFICHES_DISPONIBLES.map((preset) => (
                <option key={preset.id} value={preset.id}>{preset.nom}</option>
              ))}
            </select>
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="affiche">URL ou chemin de l’affiche (facultatif)</label>
            <input
              id="affiche"
              name="affiche"
              type="text"
              value={formulaire.affiche}
              onChange={handleChange}
              placeholder="https://… ou /images/affiche.jpg"
              aria-invalid={Boolean(erreurs.affiche)}
              aria-describedby={erreurs.affiche ? 'erreur-affiche' : undefined}
            />
            {erreurs.affiche && (
              <p className="error-msg" id="erreur-affiche">{erreurs.affiche}</p>
            )}
            <img
              className="film-cover-preview"
              src={afficheApercu}
              alt="Aperçu de l’affiche"
              onError={handleErreurAffiche}
            />
          </div>

          <div className="modal-actions form-field-full">
            <button className="button button-secondary" type="button" onClick={onFermer}>
              Annuler
            </button>
            <button className="button button-primary" type="submit">
              {estModification ? 'Enregistrer les modifications' : 'Ajouter le film'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default FilmFormModal
