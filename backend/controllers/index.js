const { PacientesService, ConsultasService, DentistasService } = require('../services/index');

class PacientesController {
  cadastrar(req, res) {
    try {
      const paciente = PacientesService.cadastrar(req.body);
      res.status(201).json(paciente);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }

  listar(req, res) {
    try {
      const pacientes = PacientesService.listar();
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  buscarPorId(req, res) {
    try {
      const paciente = PacientesService.buscarPorId(req.params.id);
      if (!paciente) return res.status(404).json({ erro: 'Paciente não encontrado' });
      res.json(paciente);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  atualizar(req, res) {
    try {
      const paciente = PacientesService.atualizar(req.params.id, req.body);
      if (!paciente) return res.status(404).json({ erro: 'Paciente não encontrado' });
      res.json(paciente);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }

  deletar(req, res) {
    try {
      const deletado = PacientesService.deletar(req.params.id);
      if (!deletado) return res.status(404).json({ erro: 'Paciente não encontrado' });
      res.json({ mensagem: 'Paciente deletado' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

class ConsultasController {
  agendar(req, res) {
    try {
      const consulta = ConsultasService.agendar(req.body);
      res.status(201).json(consulta);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }

  listar(req, res) {
    try {
      const consultas = ConsultasService.listar();
      res.json(consultas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  buscarPorId(req, res) {
    try {
      const consulta = ConsultasService.buscarPorId(req.params.id);
      if (!consulta) return res.status(404).json({ erro: 'Consulta não encontrada' });
      res.json(consulta);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  cancelar(req, res) {
    try {
      const cancelada = ConsultasService.cancelar(req.params.id);
      if (!cancelada) return res.status(404).json({ erro: 'Consulta não encontrada' });
      res.json({ mensagem: 'Consulta cancelada' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

class DentistasController {
  listar(req, res) {
    try {
      const dentistas = DentistasService.listar();
      res.json(dentistas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  buscarPorId(req, res) {
    try {
      const dentista = DentistasService.buscarPorId(req.params.id);
      if (!dentista) return res.status(404).json({ erro: 'Dentista não encontrado' });
      res.json(dentista);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = {
  PacientesController: new PacientesController(),
  ConsultasController: new ConsultasController(),
  DentistasController: new DentistasController()
};
