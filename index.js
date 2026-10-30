require('dotenv').config();

const express = require('express');
const { getConnection } = require('./config/db');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la Base de Datos
getConnection();

// Middleware para leer datos JSON en las peticiones HTTP
app.use(express.json());

// Declaración de Rutas de la API
app.use('/api/genero', require('./routes/generoRoute'));
app.use('/api/tipo', require('./routes/tipoRoute'));
<<<<<<< HEAD


// Importar el archivo de rutas de productora
const productoraRoute = require('./routes/productoraRoute');



// Enlazar la ruta con el prefijo /api/productora
app.use('/api/productora', productoraRoute); 
=======
app.use('/api/director', require('./routes/directorRoute'));
app.use('/api/productora', require('./routes/productoraRoute'));
>>>>>>> bee3f2a218f392c854540d5d5a2fa3bbcd47dcfc

// Servidor escuchando
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});