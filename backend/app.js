const express = require('express');

const app = express(); 

const PORT = process.env.PORT || 3000;


app.use(express.json());

// Rota de teste 
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API rodando corretamente '
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API rodando em http://0.0.0.0:${PORT}`);
});
