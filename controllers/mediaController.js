<<<<<<< Updated upstream
const mongoose = require('mongoose');
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Tipo = require('../models/Tipo');

// Los modelos de Director y Productora se incorporarán desde las ramas de los compañeros.
// Consultamos sus colecciones sin sobrescribir ni duplicar sus implementaciones.
const RELACIONES = [
  { campo: 'genero', coleccion: 'generos', modelo: Genero, activo: true },
  { campo: 'director', coleccion: 'directors', activo: true },
  { campo: 'productora', coleccion: 'productoras', activo: true },
  { campo: 'tipo', coleccion: 'tipos', modelo: Tipo, activo: false }
];
const CAMPOS = ['serial', 'titulo', 'sinopsis', 'url', 'imagen', 'anioEstreno', 'genero', 'director', 'productora', 'tipo'];
const poblar = [{ path: 'genero' }, { path: 'tipo' }];

function errorRespuesta(res, error) {
  if (error.code === 11000) return res.status(409).json({ msg: 'El serial o la URL ya están registrados', campos: error.keyValue });
  if (error.name === 'ValidationError' || error.name === 'CastError') return res.status(400).json({ msg: error.message });
  console.error(error);
  return res.status(500).json({ msg: 'Ocurrió un error en el servidor' });
}

async function validarRelaciones(datos) {
  for (const relacion of RELACIONES) {
    const id = datos[relacion.campo];
    if (!mongoose.isValidObjectId(id)) return `El ID de ${relacion.campo} no es válido`;
    const coleccion = relacion.modelo ? relacion.modelo.collection : mongoose.connection.collection(relacion.coleccion);
    const documento = relacion.modelo
      ? await relacion.modelo.findById(id).lean()
      : await coleccion.findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!documento) return `No existe el registro de ${relacion.campo} indicado`;
    if (relacion.activo && documento.estado !== 'Activo') return `El registro de ${relacion.campo} debe estar Activo`;
=======
const { isValidObjectId } = require('mongoose');
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const campos = ['serial', 'titulo', 'sinopsis', 'urlPelicula', 'imagenPortada', 'anioEstreno', 'genero', 'director', 'productora', 'tipo'];
const relaciones = ['genero', 'director', 'productora', 'tipo'];
const modelos = { genero: Genero, director: Director, productora: Productora, tipo: Tipo };
const expandir = (consulta) => consulta.populate('genero', 'nombre estado').populate('director', 'nombres estado').populate('productora', 'nombre estado').populate('tipo', 'nombre');

// Comprueba que las referencias recibidas existan y que género, director y productora estén activos.
async function validarRelaciones(datos) {
  for (const campo of relaciones) {
    if (!isValidObjectId(datos[campo])) return `El identificador de ${campo} no es válido`;
    const registro = await modelos[campo].findById(datos[campo]);
    if (!registro) return `El registro de ${campo} no existe`;
    if (campo !== 'tipo' && registro.estado !== 'Activo') return `El registro de ${campo} no está activo`;
>>>>>>> Stashed changes
  }
  return null;
}

<<<<<<< Updated upstream
const createMedia = async (req, res) => {
  try {
    const datos = Object.fromEntries(CAMPOS.filter(c => req.body[c] !== undefined).map(c => [c, req.body[c]]));
    const error = await validarRelaciones(datos);
    if (error) return res.status(400).json({ msg: error });
    const media = await Media.create(datos);
    return res.status(201).json(media);
  } catch (error) { return errorRespuesta(res, error); }
};

const getMedias = async (req, res) => {
  try { return res.json(await Media.find().populate(poblar).sort({ fechaCreacion: -1 })); }
  catch (error) { return errorRespuesta(res, error); }
};

const getMediaById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ msg: 'ID no válido' });
    const media = await Media.findById(req.params.id).populate(poblar);
    return media ? res.json(media) : res.status(404).json({ msg: 'Media no encontrada' });
  } catch (error) { return errorRespuesta(res, error); }
};

const updateMedia = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ msg: 'ID no válido' });
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ msg: 'Media no encontrada' });
    const cambios = Object.fromEntries(CAMPOS.filter(c => req.body[c] !== undefined).map(c => [c, req.body[c]]));
    const relaciones = Object.fromEntries(RELACIONES.map(r => [r.campo, cambios[r.campo] ?? media[r.campo]]));
    const error = await validarRelaciones(relaciones);
    if (error) return res.status(400).json({ msg: error });
    Object.assign(media, cambios);
    await media.save();
    return res.json(media);
  } catch (error) { return errorRespuesta(res, error); }
};

const deleteMedia = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ msg: 'ID no válido' });
    const media = await Media.findByIdAndDelete(req.params.id);
    return media ? res.json({ msg: 'Media eliminada correctamente' }) : res.status(404).json({ msg: 'Media no encontrada' });
  } catch (error) { return errorRespuesta(res, error); }
};

module.exports = { createMedia, getMedias, getMediaById, updateMedia, deleteMedia };
=======
// Solo acepta los campos propios de Media; las fechas y el identificador los administra el servidor.
function obtenerDatos(body) {
  return Object.fromEntries(campos.filter(campo => Object.prototype.hasOwnProperty.call(body, campo)).map(campo => [campo, body[campo]]));
}

// Responde con un error de validación o de duplicidad cuando MongoDB lo informa.
function responderError(res, error) {
  if (error.code === 11000) return res.status(409).json({ mensaje: 'El serial o la URL ya están registrados', campos: error.keyValue });
  if (error.name === 'ValidationError' || error.name === 'CastError') return res.status(400).json({ mensaje: error.message });
  console.error('Error en Media:', error);
  return res.status(500).json({ mensaje: 'Error interno al procesar Media' });
}

// Registra una película o serie después de verificar sus datos y relaciones.
const crearMedia = async (req, res) => {
  try {
    const datos = obtenerDatos(req.body);
    if (campos.some(campo => datos[campo] === undefined || datos[campo] === null || datos[campo] === '')) {
      return res.status(400).json({ mensaje: 'Se deben enviar todos los campos de Media' });
    }
    const error = await validarRelaciones(datos);
    if (error) return res.status(400).json({ mensaje: error });
    const media = await Media.create(datos);
    return res.status(201).json(media);
  } catch (error) { return responderError(res, error); }
};

// Lista las producciones e incluye los datos principales de los cuatro módulos relacionados.
const listarMedia = async (req, res) => {
  try { return res.json(await expandir(Media.find())); }
  catch (error) { return responderError(res, error); }
};

// Busca una producción por el identificador generado por MongoDB.
const obtenerMedia = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(400).json({ mensaje: 'ID inválido' });
    const media = await expandir(Media.findById(req.params.id));
    if (!media) return res.status(404).json({ mensaje: 'Producción no encontrada' });
    return res.json(media);
  } catch (error) { return responderError(res, error); }
};

// Actualiza los campos enviados y vuelve a comprobar las relaciones antes de guardar.
const actualizarMedia = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(400).json({ mensaje: 'ID inválido' });
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ mensaje: 'Producción no encontrada' });
    const cambios = obtenerDatos(req.body);
    const datos = { ...media.toObject(), ...cambios };
    const error = await validarRelaciones(datos);
    if (error) return res.status(400).json({ mensaje: error });
    Object.assign(media, cambios);
    media.fechaActualizacion = new Date();
    await media.save();
    return res.json(media);
  } catch (error) { return responderError(res, error); }
};

// Elimina únicamente la producción indicada, sin borrar sus registros relacionados.
const eliminarMedia = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(400).json({ mensaje: 'ID inválido' });
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ mensaje: 'Producción no encontrada' });
    return res.json({ mensaje: 'Producción eliminada', media });
  } catch (error) { return responderError(res, error); }
};

module.exports = { crearMedia, listarMedia, obtenerMedia, actualizarMedia, eliminarMedia };
>>>>>>> Stashed changes
