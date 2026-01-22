const express = require('express');
const cors = require('cors');
const routes = require('./routers/routes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ API rodando em http://localhost:${PORT}`);
});
