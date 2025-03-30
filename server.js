const express = require('express');
const path = require('path');
const app = express();
const PORT = 80;

// Definir qual aplicação é esta (red ou green)
const APP_PATH = '/red'; // Mudar para '/green' na branch green

// Middleware para servir arquivos estáticos
app.use(APP_PATH, express.static(__dirname));

// Rota raiz - redireciona para o caminho correto
app.get('/', (req, res) => {
  res.redirect(APP_PATH);
});

// Rota específica para o app path
app.get(APP_PATH, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Adiciona log para depuração
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}, acessível em ${APP_PATH}`);
});
