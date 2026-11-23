import Navbar from './Navbar.jsx'

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="egy.mch.best, accueil">
        <span className="brand-mark" aria-hidden="true">E</span>
        <span>egy.mch.best</span>
      </a>
      <Navbar />
    </header>
  )
}

export default Header
