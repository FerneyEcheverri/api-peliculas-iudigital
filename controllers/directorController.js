const Director = require('../models/Director');

// Función para crear un nuevo director (POST)
const crearDirector = async (req, res) => {
    try {
        const { nombres, estado } = req.body;

        const nuevoDirector = new Director({
            nombres,
            estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        await nuevoDirector.save();
        res.status(201).json(nuevoDirector);

    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el director", error });
    }
};

// Función para listar todos los directores (GET)
const obtenerDirectores = async (req, res) => {
    try {
        const directores = await Director.find();
        res.json(directores);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener directores", error });
    }
};

module.exports = {
    crearDirector,
    obtenerDirectores
};