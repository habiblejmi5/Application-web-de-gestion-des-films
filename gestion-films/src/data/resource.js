export const GENRES = [
  'Action',
  'Animation',
  'Comédie',
  'Comédie musicale',
  'Drame',
  'Fantastique',
  'Horreur',
  'Policier',
  'Sci-Fi',
  'Science-fiction',
  'Thriller',
]

const COULEURS_PAR_GENRE = {
  Action: ['#9d362c', '#281718'],
  Animation: ['#d6873e', '#42214d'],
  Comédie: ['#d58c45', '#572d30'],
  'Comédie musicale': ['#a14e8b', '#271d4a'],
  Drame: ['#647b68', '#182d32'],
  Fantastique: ['#6374b6', '#201d4c'],
  Horreur: ['#a43d45', '#19171e'],
  Policier: ['#4c6879', '#17232e'],
  'Sci-Fi': ['#388c91', '#162840'],
  'Science-fiction': ['#388c91', '#162840'],
  Thriller: ['#9b6946', '#20202b'],
}

function echapperXml(texte) {
  return texte
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function decouperEnLignes(texte, longueurMax = 18) {
  const lignes = []
  let ligne = ''

  texte.split(/\s+/).forEach((mot) => {
    const proposition = ligne ? `${ligne} ${mot}` : mot
    if (proposition.length > longueurMax && ligne) {
      lignes.push(ligne)
      ligne = mot
    } else {
      ligne = proposition
    }
  })

  if (ligne) lignes.push(ligne)
  return lignes.slice(0, 4)
}

function creerAffiche(titre, genre, couleurs) {
  const lignesTitre = decouperEnLignes(titre)
  const debutTitre = 325 - (lignesTitre.length - 1) * 35
  const positionGenre = debutTitre - 44
  const lignesSvg = lignesTitre
    .map((ligne, index) => (
      `<tspan x="32" dy="${index === 0 ? 0 : 38}">${echapperXml(ligne)}</tspan>`
    ))
    .join('')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="540" viewBox="0 0 360 540">
      <defs>
        <linearGradient id="fond" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${couleurs[0]}"/>
          <stop offset="1" stop-color="${couleurs[1]}"/>
        </linearGradient>
        <linearGradient id="voile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#080b10" stop-opacity=".04"/>
          <stop offset="1" stop-color="#080b10" stop-opacity=".7"/>
        </linearGradient>
      </defs>
      <rect width="360" height="540" fill="url(#fond)"/>
      <circle cx="266" cy="170" r="118" fill="#ffffff" fill-opacity=".09"/>
      <circle cx="266" cy="170" r="82" fill="none" stroke="#ffffff" stroke-opacity=".16"/>
      <path d="M0 370 154 204l76 89 47-55 83 92v210H0Z" fill="#080b10" fill-opacity=".22"/>
      <path d="M0 427 102 322l72 79 82-105 104 105v139H0Z" fill="#080b10" fill-opacity=".28"/>
      <rect width="360" height="540" fill="url(#voile)"/>
      <text x="32" y="46" fill="#d7ed9b" font-family="Arial,sans-serif" font-size="12" letter-spacing="3">EGY.MCH.BEST</text>
      <text x="32" y="${positionGenre}" fill="#d7ed9b" font-family="Arial,sans-serif" font-size="11" letter-spacing="2">${echapperXml(genre.toUpperCase())}</text>
      <text x="32" y="${debutTitre}" fill="#ffffff" font-family="Georgia,serif" font-size="34" font-weight="600">${lignesSvg}</text>
      <path d="M32 500h54" stroke="#d7ed9b" stroke-width="2"/>
      <text x="32" y="520" fill="#ffffff" fill-opacity=".7" font-family="Arial,sans-serif" font-size="9" letter-spacing="2">UNE HISTOIRE À DÉCOUVRIR</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const filmsSansAffiche = [
  { id: 1, titre: 'Inception', realisateur: 'Christopher Nolan', genre: 'Science-fiction', annee: 2010, duree: 148, note: 8.8 },
  { id: 2, titre: 'The Dark Knight', realisateur: 'Christopher Nolan', genre: 'Action', annee: 2008, duree: 152, note: 9 },
  { id: 3, titre: 'Interstellar', realisateur: 'Christopher Nolan', genre: 'Science-fiction', annee: 2014, duree: 169, note: 8.7 },
  { id: 4, titre: 'Le Parrain', realisateur: 'Francis Ford Coppola', genre: 'Drame', annee: 1972, duree: 175, note: 9.2 },
  { id: 5, titre: 'Pulp Fiction', realisateur: 'Quentin Tarantino', genre: 'Policier', annee: 1994, duree: 154, note: 8.9 },
  { id: 6, titre: 'Forrest Gump', realisateur: 'Robert Zemeckis', genre: 'Drame', annee: 1994, duree: 142, note: 8.8 },
  { id: 7, titre: 'The Matrix', realisateur: 'Lana et Lilly Wachowski', genre: 'Science-fiction', annee: 1999, duree: 136, note: 8.7 },
  { id: 8, titre: 'Le Seigneur des anneaux : La Communauté de l’anneau', realisateur: 'Peter Jackson', genre: 'Fantastique', annee: 2001, duree: 178, note: 8.8 },
  { id: 9, titre: 'Gladiator', realisateur: 'Ridley Scott', genre: 'Action', annee: 2000, duree: 155, note: 8.5 },
  { id: 10, titre: 'Les Évadés', realisateur: 'Frank Darabont', genre: 'Drame', annee: 1994, duree: 142, note: 9.3 },
  { id: 11, titre: 'Le Roi lion', realisateur: 'Roger Allers et Rob Minkoff', genre: 'Animation', annee: 1994, duree: 88, note: 8.5 },
  { id: 12, titre: 'Parasite', realisateur: 'Bong Joon-ho', genre: 'Thriller', annee: 2019, duree: 132, note: 8.5 },
  { id: 13, titre: 'Shining', realisateur: 'Stanley Kubrick', genre: 'Horreur', annee: 1980, duree: 146, note: 8.4 },
  { id: 14, titre: 'La La Land', realisateur: 'Damien Chazelle', genre: 'Comédie musicale', annee: 2016, duree: 128, note: 8 },
  { id: 15, titre: 'Intouchables', realisateur: 'Olivier Nakache et Éric Toledano', genre: 'Comédie', annee: 2011, duree: 112, note: 8.5 },
  { id: 16, titre: 'Titanic', realisateur: 'James Cameron', genre: 'Drame', annee: 1997, duree: 194, note: 7.9 },
  { id: 17, titre: 'Avatar', realisateur: 'James Cameron', genre: 'Science-fiction', annee: 2009, duree: 162, note: 7.6 },
  { id: 18, titre: 'Jurassic Park', realisateur: 'Steven Spielberg', genre: 'Science-fiction', annee: 1993, duree: 127, note: 8.2 },
  { id: 19, titre: 'Fight Club', realisateur: 'David Fincher', genre: 'Thriller', annee: 1999, duree: 139, note: 8.4 },
  { id: 20, titre: 'Whiplash', realisateur: 'Damien Chazelle', genre: 'Drame', annee: 2014, duree: 107, note: 8.5 },
  { id: 21, titre: 'Coco', realisateur: 'Lee Unkrich', genre: 'Animation', annee: 2017, duree: 105, note: 8.4 },
  { id: 22, titre: 'Le Voyage de Chihiro', realisateur: 'Hayao Miyazaki', genre: 'Animation', annee: 2001, duree: 125, note: 8.5 },
  { id: 23, titre: 'Retour vers le futur', realisateur: 'Robert Zemeckis', genre: 'Science-fiction', annee: 1985, duree: 116, note: 8.3 },
  { id: 24, titre: 'Le Silence des agneaux', realisateur: 'Jonathan Demme', genre: 'Thriller', annee: 1991, duree: 119, note: 8.6 },
  { id: 25, titre: 'Avengers: Endgame', realisateur: 'Anthony Russo et Joe Russo', genre: 'Action', annee: 2019, duree: 181, note: 8.3 },
  { id: 26, titre: 'La Ligne verte', realisateur: 'Frank Darabont', genre: 'Drame', annee: 1999, duree: 189, note: 8.5 },
  { id: 27, titre: 'Le Seigneur des anneaux : Les Deux Tours', realisateur: 'Peter Jackson', genre: 'Fantastique', annee: 2002, duree: 179, note: 8.6 },
  { id: 28, titre: 'Le Seigneur des anneaux : Le Retour du roi', realisateur: 'Peter Jackson', genre: 'Fantastique', annee: 2003, duree: 201, note: 8.5 },
  { id: 29, titre: 'Avengers', realisateur: 'Joss Whedon', genre: 'Action', annee: 2012, duree: 143, note: 7.7 },
  { id: 30, titre: 'Spider-Man : New Generation', realisateur: 'Bob Persichetti, Peter Ramsey et Rodney Rothman', genre: 'Animation', annee: 2018, duree: 117, note: 8.4 },
  { id: 31, titre: 'The Grand Budapest Hotel', realisateur: 'Wes Anderson', genre: 'Comédie', annee: 2014, duree: 100, note: 8 },
  { id: 32, titre: 'The Truman Show', realisateur: 'Peter Weir', genre: 'Comédie', annee: 1998, duree: 103, note: 8.1 },
  { id: 33, titre: 'Le Loup de Wall Street', realisateur: 'Martin Scorsese', genre: 'Drame', annee: 2013, duree: 180, note: 8 },
  { id: 34, titre: 'Oldboy', realisateur: 'Park Chan-wook', genre: 'Thriller', annee: 2003, duree: 120, note: 8.3 },
  { id: 35, titre: 'Le Fabuleux Destin d’Amélie Poulain', realisateur: 'Jean-Pierre Jeunet', genre: 'Comédie', annee: 2001, duree: 122, note: 8 },
  { id: 36, titre: 'Les Dents de la mer', realisateur: 'Steven Spielberg', genre: 'Thriller', annee: 1975, duree: 124, note: 7.7 },
]

const URLS_AFFICHES_FILMS = {
  1: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
  2: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  3: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  4: 'https://media.themoviedb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
  5: 'https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
  6: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
  7: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
  8: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
  9: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
  10: 'https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
  11: 'https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg',
  12: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  13: 'https://media.themoviedb.org/t/p/w500/uAR0AWqhQL1hQa69UDEbb2rE5Wx.jpg',
  14: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
  15: 'https://image.tmdb.org/t/p/w500/1QU7HKgsQbGpzsJbJK4pAVQV9F5.jpg',
  16: 'https://media.themoviedb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
  17: 'https://media.themoviedb.org/t/p/w500/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg',
  18: 'https://media.themoviedb.org/t/p/w500/d9mtMGQDLANKieb9PbD3yK7xxzo.jpg',
  19: 'https://media.themoviedb.org/t/p/w500/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg',
  20: 'https://media.themoviedb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
  21: 'https://media.themoviedb.org/t/p/w500/6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg',
  22: 'https://media.themoviedb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
  23: 'https://media.themoviedb.org/t/p/w500/vN5B5WgYscRGcQpVhHl6p9DDTP0.jpg',
  24: 'https://media.themoviedb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg',
  25: 'https://media.themoviedb.org/t/p/w500/jtDv3lCnST0fZRvdYFwR5CVwK2x.jpg',
  26: 'https://media.themoviedb.org/t/p/w500/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg',
  27: 'https://media.themoviedb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg',
  28: 'https://media.themoviedb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
  29: 'https://media.themoviedb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
  30: 'https://media.themoviedb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
  31: 'https://media.themoviedb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
  32: 'https://media.themoviedb.org/t/p/w500/vuza0WqY239yBXOadKlGwJsZJFE.jpg',
  33: 'https://media.themoviedb.org/t/p/w500/kW9LmvYHAaS9iA0tHmZVq8hQYoq.jpg',
  34: 'https://media.themoviedb.org/t/p/w500/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg',
  35: 'https://media.themoviedb.org/t/p/w500/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg',
  36: 'https://media.themoviedb.org/t/p/w500/lxM6kqilAdpdhqUl2biYp5frUxE.jpg',
}

export const AFFICHES_PAR_GENRE = Object.fromEntries(
  GENRES.map((genre) => [
    genre,
    creerAffiche(genre, genre, COULEURS_PAR_GENRE[genre]),
  ]),
)

const AFFICHES_FILMS = Object.fromEntries(
  filmsSansAffiche.map((film) => [
    film.id,
    creerAffiche(film.titre, film.genre, COULEURS_PAR_GENRE[film.genre]),
  ]),
)

export const AFFICHE_DEFAUT = creerAffiche(
  'egy.mch.best',
  'Votre cinéma',
  ['#627c70', '#182738'],
)

export const FILMS_INITIAUX = filmsSansAffiche.map((film) => ({
  ...film,
  affiche: URLS_AFFICHES_FILMS[film.id] || AFFICHES_FILMS[film.id],
}))

export const AFFICHES_DISPONIBLES = [
  ...Object.entries(AFFICHES_PAR_GENRE).map(([genre, affiche]) => ({
    id: `genre-${genre}`,
    nom: `Couverture ${genre}`,
    affiche,
  })),
  ...FILMS_INITIAUX.map((film) => ({
    id: `film-${film.id}`,
    nom: film.titre,
    affiche: film.affiche,
  })),
  {
    id: 'defaut',
    nom: 'Affiche par défaut',
    affiche: AFFICHE_DEFAUT,
  },
]
