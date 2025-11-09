import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './paginas/Home'
import PartiesReview from './paginas/PartiesReview'
import InstitutionalInfo from './paginas/InstitutionalInfo'
import Contact from './paginas/Contact'
import VotingLogin from './paginas/VotingLogin'
import VotingPanel from './paginas/VotingPanel'
import { VotingProvider } from './context/VotingContext'

export default function App() {
  return (
    <BrowserRouter>
      <VotingProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partidos" element={<PartiesReview />} />
          <Route path="/institucional" element={<InstitutionalInfo />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/votar" element={<VotingLogin />} />
          <Route path="/panel-votacion" element={<VotingPanel />} />
        </Routes>
      </VotingProvider>
    </BrowserRouter>
  )
}
