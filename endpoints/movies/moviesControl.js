// Requerir consultas de las bases de datos
const {
  getAllMovies,
  getMovieWith,
  getMovieById,
  registerMovie,
  editMovieById,
  deleteMovieById,
} = require("./moviesModel");

// Requerir funcion de numero entero positivo
const notNumber = require("../../utils/notNumber");

// Requerir clave url_base (.env)
const url = process.env.url_base;

// get all movies
const listAll = async (req, res, next) => {
  if (req.query.name) {
    dbResponse = await getMovieWith(req.query.name);
  } else {
    dbResponse = await getAllMovies();
  }
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// get movie by id
const listOne = async function (req, res, next) {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await getMovieById(Number(req.params.id));
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// Register new movie
const register = async (req, res, next) => {
  const image = `${url}movieImage/${req.file.filename}`;
  const dbResponse = await registerMovie({ ...req.body, image });
  if (dbResponse instanceof Error) return next(dbResponse);
  res.status(201).json(`Movie ${req.body.name} created!`);
};

// patch movie
const editOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await editMovieById(+req.params.id, req.body);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(200).json(req.body) : next();
};

// delete movie by id
const removeOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await deleteMovieById(+req.params.id);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(204).end() : next();
};

// Exportar controladores
module.exports = {
  listAll,
  listOne,
  register,
  editOne,
  removeOne,
};
