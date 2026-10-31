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
app.use('/api/tipo', require('./routes/tipoRoute'));

<<<<<<< Updated upstream
=======


// Importar el archivo de rutas de productora
const productoraRoute = require('./routes/productoraRoute');


// Enlazar la ruta con el prefijo /api/productora
app.use('/api/productora', productoraRoute); 

app.use('/api/director', require('./routes/directorRoute'));
app.use('/api/productora', require('./routes/productoraRoute'));

//Enlace al módulo de media que es la última ejecución de la API y la que depende de los otros cuatro módulos.
app.use('/api/media', require('./routes/mediaRoute'));


>>>>>>> Stashed changes
// Servidor escuchando
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});