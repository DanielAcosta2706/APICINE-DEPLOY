// Requerir consultas de las bases de datos
const {
  getAllCinema,
  getCinemaWith,
  getCinemaById,
  registerCinema,
  editCinemaById,
  deleteCinemaById,
} = require("./cinemaModel");

// Requerir funcion de numero entero positivo
const notNumber = require("../../utils/notNumber");

// Requerir clave url_base (.env)
const url = process.env.url_base;

// get all cinema
const listAll = async (req, res, next) => {
  if (req.query.cinemaName) {
    dbResponse = await getCinemaWith(req.query.cinemaName);
  } else {
    dbResponse = await getAllCinema();
  }
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// get cinema by id
const listOne = async function (req, res, next) {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await getCinemaById(Number(req.params.id));
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// Register new cinema
const register = async (req, res, next) => {
  const image = `${url}cinemaImage/${req.file.filename}`;
  const dbResponse = await registerCinema({ ...req.body, image });
  if (dbResponse instanceof Error) return next(dbResponse);
  res.status(201).json(`Cinema ${req.body.cinemaName} created!`);
};

// patch cinema
const editOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await editCinemaById(+req.params.id, req.body);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(200).json(req.body) : next();
};

// delete cinema by id
const removeOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await deleteCinemaById(+req.params.id);
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
