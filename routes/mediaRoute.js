const { Router } = require('express');
<<<<<<< Updated upstream
const { createMedia, getMedias, getMediaById, updateMedia, deleteMedia } = require('../controllers/mediaController');
const router = Router();
router.post('/', createMedia);
router.get('/', getMedias);
router.get('/:id', getMediaById);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);
=======
const { crearMedia, listarMedia, obtenerMedia, actualizarMedia, eliminarMedia } = require('../controllers/mediaController');
const router = Router();

// Las rutas se montan desde index.js con el prefijo /api/media.
router.post('/', crearMedia);
router.get('/', listarMedia);
router.get('/:id', obtenerMedia);
router.put('/:id', actualizarMedia);
router.delete('/:id', eliminarMedia);

>>>>>>> Stashed changes
module.exports = router;
