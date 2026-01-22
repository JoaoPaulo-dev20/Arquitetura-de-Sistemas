import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Professionals from './pages/Professionals'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'

export default function App() {
  const [page, setPage] = useState('home')

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home />
      case 'services': return <Services setPage={setPage} />
      case 'professionals': return <Professionals setPage={setPage} />
      case 'about': return <About />
      case 'contact': return <Contact />
      case 'appointment': return <Appointment />
      default: return <Home />
    }
  }

  return (
    <div className="app">
      <Header setPage={setPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}
