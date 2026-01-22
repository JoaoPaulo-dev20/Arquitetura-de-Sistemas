const { PacientesRepository, ConsultasRepository, DentistasRepository } = require('../repositories/index');

class PacientesService {
  cadastrar(dados) {
    if (!dados.nome || dados.nome.trim().length < 3) {
      throw new Error('Nome deve ter no mínimo 3 caracteres');
    }
    return PacientesRepository.criar(dados);
  }

  listar() {
    return PacientesRepository.listar();
  }

  buscarPorId(id) {
    return PacientesRepository.buscarPorId(id);
  }

  atualizar(id, dados) {
    return PacientesRepository.atualizar(id, dados);
  }

  deletar(id) {
    return PacientesRepository.deletar(id);
  }
}

class ConsultasService {
  agendar(dados) {
    if (!dados.pacienteId || !dados.dentista || !dados.inicio) {
      throw new Error('Dados incompletos para agendamento');
    }
    return ConsultasRepository.criar(dados);
  }

  listar() {
    return ConsultasRepository.listar();
  }

  buscarPorId(id) {
    return ConsultasRepository.buscarPorId(id);
  }

  cancelar(id) {
    return ConsultasRepository.deletar(id);
  }
}

class DentistasService {
  listar() {
    return DentistasRepository.listar();
  }

  buscarPorId(id) {
    return DentistasRepository.buscarPorId(id);
  }
}

module.exports = {
  PacientesService: new PacientesService(),
  ConsultasService: new ConsultasService(),
  DentistasService: new DentistasService()
};
