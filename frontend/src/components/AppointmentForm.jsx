import { useState, useEffect } from 'react'
import { pacientesAPI, consultasAPI, dentistasAPI } from '../services/api'

export default function AppointmentForm() {
  const [form, setForm] = useState({ nome: '', telefone: '', dentista: '', inicio: '' })
  const [dentistas, setDentistas] = useState([])
  const [consultas, setConsultas] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [horariosIndisponiveis, setHorariosIndisponiveis] = useState([])

  // Carregar dentistas e consultas ao montar o componente
  useEffect(() => {
    const carregar = async () => {
      try {
        const listaDentistas = await dentistasAPI.listar()
        const listaConsultas = await consultasAPI.listar()
        setDentistas(listaDentistas)
        setConsultas(listaConsultas)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }
    carregar()
  }, [])

  // Verificar se o horário já está ocupado
  const verificarDisponibilidade = (dataHora) => {
    if (!dataHora) return true

    return !consultas.some((consulta) => {
      return new Date(consulta.inicio).getTime() === new Date(dataHora).getTime()
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    // Validar disponibilidade em tempo real
    if (name === 'inicio') {
      const disponivel = verificarDisponibilidade(value)
      if (!disponivel) {
        setMessage('⏰ Este horário já está ocupado!')
      } else {
        setMessage('')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Validar todos os campos
    if (!form.nome || !form.telefone || !form.dentista || !form.inicio) {
      setMessage('❌ Preencha todos os campos!')
      setLoading(false)
      return
    }

    // Verificar disponibilidade novamente
    if (!verificarDisponibilidade(form.inicio)) {
      setMessage('❌ Este horário já foi agendado! Escolha outro horário.')
      setLoading(false)
      return
    }

    // Validar se a data é no futuro
    const dataSelecionada = new Date(form.inicio)
    const agora = new Date()
    if (dataSelecionada <= agora) {
      setMessage('❌ Selecione uma data e hora no futuro!')
      setLoading(false)
      return
    }

    try {
      // Cadastrar paciente
      const paciente = await pacientesAPI.criar({ 
        nome: form.nome, 
        telefone: form.telefone 
      })

      // Agendar consulta
      const novaConsulta = await consultasAPI.criar({
        pacienteId: paciente.id,
        dentista: form.dentista,
        inicio: form.inicio,
      })

      setMessage('✅ Consulta agendada com sucesso!')
      
      // Atualizar lista de consultas
      setConsultas([...consultas, novaConsulta])
      
      // Limpar formulário
      setForm({ nome: '', telefone: '', dentista: '', inicio: '' })

      // Limpar mensagem após 3 segundos
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(`❌ Erro: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const isHorarioOcupado = form.inicio && !verificarDisponibilidade(form.inicio)

  return (
    <div className="appointment-page">
      <div className="form-container">
        <h2>📅 Agende sua Consulta</h2>
        <p className="subtitle">Escolha o melhor horário para você</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>👤 Nome Completo:</label>
            <input 
              type="text" 
              name="nome" 
              value={form.nome} 
              onChange={handleChange} 
              required 
              minLength="3"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="form-group">
            <label>📱 Telefone:</label>
            <input 
              type="tel" 
              name="telefone" 
              value={form.telefone} 
              onChange={handleChange} 
              required
              placeholder="(11) 9999-9999"
            />
          </div>

          <div className="form-group">
            <label>👨‍⚕️ Dentista:</label>
            <select 
              name="dentista" 
              value={form.dentista} 
              onChange={handleChange} 
              required
            >
              <option value="">-- Selecione um dentista --</option>
              {dentistas.map((d) => (
                <option key={d.id} value={d.nome}>
                  {d.nome} - {d.especialidade}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              📆 Data e Hora:
              {isHorarioOcupado && <span className="warning-badge">OCUPADO</span>}
            </label>
            <input 
              type="datetime-local" 
              name="inicio" 
              value={form.inicio} 
              onChange={handleChange} 
              required
              className={isHorarioOcupado ? 'input-error' : ''}
            />
            {isHorarioOcupado && (
              <p className="help-text error">
                ⚠️ Este horário já está ocupado
              </p>
            )}
          </div>

          <div className="appointment-info">
            <h4>📋 Resumo do Agendamento:</h4>
            <div className="info-resume">
              <p><strong>Paciente:</strong> {form.nome || 'Não informado'}</p>
              <p><strong>Dentista:</strong> {form.dentista || 'Não selecionado'}</p>
              <p><strong>Data/Hora:</strong> {form.inicio ? new Date(form.inicio).toLocaleString('pt-BR') : 'Não definida'}</p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || isHorarioOcupado}
            className={isHorarioOcupado ? 'btn-disabled' : ''}
          >
            {loading ? '⏳ Agendando...' : '✅ Confirmar Agendamento'}
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="agendamentos-recentes">
        <h3>📌 Agendamentos Recentes</h3>
        {consultas.length === 0 ? (
          <p className="no-data">Nenhum agendamento ainda</p>
        ) : (
          <div className="consultas-list">
            {consultas.slice(-5).reverse().map((consulta, idx) => (
              <div key={idx} className="consulta-item">
                <p><strong>{consulta.dentista}</strong></p>
                <p>{new Date(consulta.inicio).toLocaleString('pt-BR')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
