// Importar dependencias
const express = require('express');
require('dotenv').config();
const apiRoutes = require('./routes/api');

// Crear instancia de Express
const app = express();

// Configurar middlewares
app.use(express.json());

app.use('/api', apiRoutes);

// Definir rutas
app.get('/', (req, res) => {
  res.send('Hello Changos!!!');
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
