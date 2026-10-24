require('dotenv').config();

const express = require('express');
const { getConnection } = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la Base de Datos
getConnection();

// Middleware para leer datos JSON en las peticiones HTTP
app.use(express.json());

// Declaración de Rutas de la API
app.use('/api/genero', require('./routes/generoRoute'));

// Servidor escuchando
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});