const API_URL = 'http://localhost:3000'

export const pacientesAPI = {
  criar: async (dados) => {
    const res = await fetch(`${API_URL}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!res.ok) throw new Error('Erro ao cadastrar paciente')
    return res.json()
  },

  listar: async () => {
    const res = await fetch(`${API_URL}/pacientes`)
    if (!res.ok) throw new Error('Erro ao listar pacientes')
    return res.json()
  },

  buscar: async (id) => {
    const res = await fetch(`${API_URL}/pacientes/${id}`)
    if (!res.ok) throw new Error('Paciente não encontrado')
    return res.json()
  },

  atualizar: async (id, dados) => {
    const res = await fetch(`${API_URL}/pacientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!res.ok) throw new Error('Erro ao atualizar paciente')
    return res.json()
  },

  deletar: async (id) => {
    const res = await fetch(`${API_URL}/pacientes/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Erro ao deletar paciente')
    return res.json()
  }
}

export const consultasAPI = {
  criar: async (dados) => {
    const res = await fetch(`${API_URL}/consultas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!res.ok) throw new Error('Erro ao agendar consulta')
    return res.json()
  },

  listar: async () => {
    const res = await fetch(`${API_URL}/consultas`)
    if (!res.ok) throw new Error('Erro ao listar consultas')
    return res.json()
  },

  buscar: async (id) => {
    const res = await fetch(`${API_URL}/consultas/${id}`)
    if (!res.ok) throw new Error('Consulta não encontrada')
    return res.json()
  },

  cancelar: async (id) => {
    const res = await fetch(`${API_URL}/consultas/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Erro ao cancelar consulta')
    return res.json()
  }
}

export const dentistasAPI = {
  listar: async () => {
    const res = await fetch(`${API_URL}/dentistas`)
    if (!res.ok) throw new Error('Erro ao listar dentistas')
    return res.json()
  },

  buscar: async (id) => {
    const res = await fetch(`${API_URL}/dentistas/${id}`)
    if (!res.ok) throw new Error('Dentista não encontrado')
    return res.json()
  }
}
