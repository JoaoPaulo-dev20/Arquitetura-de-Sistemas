export default function Header({ setPage }) {
  return (
    <header>
      <h1>🦷 Clínica Odontológica</h1>
      <nav>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('services')}>Serviços</button>
        <button onClick={() => setPage('professionals')}>Profissionais</button>
        <button onClick={() => setPage('about')}>Sobre</button>
        <button onClick={() => setPage('contact')}>Contato</button>
        <button onClick={() => setPage('appointment')}>Agendamento</button>
      </nav>
    </header>
  )
}
