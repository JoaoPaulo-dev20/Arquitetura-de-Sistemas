import { useState, useEffect } from 'react'
import { dentistasAPI } from '../services/api'

export default function Professionals({ setPage }) {
  const [profissionais, setProfissionais] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const carregarProfissionais = async () => {
      try {
        const dados = await dentistasAPI.listar()
        setProfissionais(dados)
      } catch (err) {
        setError('Erro ao carregar profissionais')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    carregarProfissionais()
  }, [])

  if (loading) return <div className="page"><p>Carregando profissionais...</p></div>
  if (error) return <div className="page"><p style={{ color: 'red' }}>{error}</p></div>

  return (
    <div className="page">
      <h2>👨‍⚕️ Nossos Profissionais</h2>
      <p>
        Conheça nossa equipe de dentistas altamente qualificados e experientes.
      </p>

      <div className="professionals-grid">
        {profissionais.map((prof) => (
          <div key={prof.id} className="professional-card">
            <div className="professional-avatar">
              👨‍⚕️
            </div>
            <h3>{prof.nome}</h3>
            <div className="professional-info">
              <p><strong>Especialidade:</strong></p>
              <p className="specialty">{prof.especialidade}</p>
            </div>
            <div className="professional-info">
              <p><strong>Telefone:</strong></p>
              <p className="phone">{prof.telefone}</p>
            </div>
            <button onClick={() => setPage('appointment')} className="btn-agendar">
              Agendar Consulta
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
