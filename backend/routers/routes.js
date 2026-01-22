const express = require('express');
const { PacientesController, ConsultasController, DentistasController } = require('../controllers/index');

const router = express.Router();

// Rotas de Pacientes
router.post('/pacientes', (req, res) => PacientesController.cadastrar(req, res));
router.get('/pacientes', (req, res) => PacientesController.listar(req, res));
router.get('/pacientes/:id', (req, res) => PacientesController.buscarPorId(req, res));
router.put('/pacientes/:id', (req, res) => PacientesController.atualizar(req, res));
router.delete('/pacientes/:id', (req, res) => PacientesController.deletar(req, res));

// Rotas de Consultas
router.post('/consultas', (req, res) => ConsultasController.agendar(req, res));
router.get('/consultas', (req, res) => ConsultasController.listar(req, res));
router.get('/consultas/:id', (req, res) => ConsultasController.buscarPorId(req, res));
router.delete('/consultas/:id', (req, res) => ConsultasController.cancelar(req, res));

// Rotas de Dentistas
router.get('/dentistas', (req, res) => DentistasController.listar(req, res));
router.get('/dentistas/:id', (req, res) => DentistasController.buscarPorId(req, res));

module.exports = router;
