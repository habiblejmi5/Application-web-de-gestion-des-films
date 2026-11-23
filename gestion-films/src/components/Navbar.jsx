import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navigation" aria-label="Navigation principale">
      <Link to="/">Accueil</Link>
      <Link to="/films">Explorer les films</Link>
      <Link to="/classement">Classement</Link>
    </nav>
  )
}

export default Navbar
