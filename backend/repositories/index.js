// Dados em memória
let pacientes = [];
let consultas = [];
let pacienteId = 1;
let consultaId = 1;
let dentistas = [
  { id: 1, nome: 'Dra. Maria Silva', especialidade: 'Clínica Geral', telefone: '11 98765-4321' },
  { id: 2, nome: 'Dr. João Santos', especialidade: 'Ortodontia', telefone: '11 98765-4322' },
  { id: 3, nome: 'Dra. Ana Costa', especialidade: 'Implantodontia', telefone: '11 98765-4323' },
  { id: 4, nome: 'Dr. Carlos Oliveira', especialidade: 'Endodontia', telefone: '11 98765-4324' },
  { id: 5, nome: 'Dra. Paula Ferreira', especialidade: 'Periodontia', telefone: '11 98765-4325' },
];

class PacientesRepository {
  criar(dados) {
    const paciente = { id: pacienteId++, ...dados, criadoEm: new Date() };
    pacientes.push(paciente);
    return paciente;
  }

  listar() {
    return pacientes;
  }

  buscarPorId(id) {
    return pacientes.find(p => p.id === Number(id));
  }

  atualizar(id, dados) {
    const index = pacientes.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      pacientes[index] = { ...pacientes[index], ...dados };
      return pacientes[index];
    }
    return null;
  }

  deletar(id) {
    const index = pacientes.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      pacientes.splice(index, 1);
      return true;
    }
    return false;
  }
}

class ConsultasRepository {
  criar(dados) {
    const consulta = { id: consultaId++, ...dados, status: 'agendada', criadoEm: new Date() };
    consultas.push(consulta);
    return consulta;
  }

  listar() {
    return consultas;
  }

  buscarPorId(id) {
    return consultas.find(c => c.id === Number(id));
  }

  deletar(id) {
    const index = consultas.findIndex(c => c.id === Number(id));
    if (index !== -1) {
      consultas.splice(index, 1);
      return true;
    }
    return false;
  }
}

class DentistasRepository {
  listar() {
    return dentistas;
  }

  buscarPorId(id) {
    return dentistas.find(d => d.id === Number(id));
  }
}

module.exports = { PacientesRepository: new PacientesRepository(), ConsultasRepository: new ConsultasRepository(), DentistasRepository: new DentistasRepository() };
