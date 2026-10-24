require('dotenv').config(); // 👈 LÍNEA 1: Carga las variables del .env antes que todo

const express = require('express');
const { getConnection } = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Probar la conexión a la base de datos
getConnection();

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.send('API Películas IUDigital funcionando correctamente');
});

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});