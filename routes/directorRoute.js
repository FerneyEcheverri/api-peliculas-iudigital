const { Router } = require('express');
const { crearDirector } = require('../controllers/directorController');

const router = Router();

// Ruta para crear un director
router.post('/', crearDirector);

module.exports = router;