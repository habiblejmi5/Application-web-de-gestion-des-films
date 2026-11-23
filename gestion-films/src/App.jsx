import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Accueil from './pages/Accueil.jsx'
import Films from './pages/Films.jsx'
import Classement from './pages/Classement.jsx'
import NotFound from './pages/NotFound.jsx'
import FilmDetails from './pages/FilmDetails.jsx'
import FilmsProvider from './context/FilmsProvider.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <FilmsProvider>
        <div className="app-shell">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/films" element={<Films />} />
              <Route path="/classement" element={<Classement />} />
              <Route path="/films/ajouter" element={<Films modeInitial="ajout" />} />
              <Route path="/films/modifier/:id" element={<Films modeInitial="modification" />} />
              <Route path="/films/:id" element={<FilmDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FilmsProvider>
    </BrowserRouter>
  )
}

export default App