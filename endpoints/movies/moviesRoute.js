// Requerir Router de express
const router = require("express").Router();

// Requerir controladores
const {
  listAll,
  listOne,
  editOne,
  removeOne,
  register,
} = require("./moviesControl");

// Requerir validaciones
const { validatorCreateMovie } = require("./validatorMovies");

// Requerir carga de archivos
const fileUploadMovie = require("./handleStorageMovie");

// Rutas
// get all movies
router.get("/", listAll);

// get movie by id
router.get("/:id", listOne);

// Register new movie
router.post(
  "/register",
  fileUploadMovie.single("file"),
  validatorCreateMovie,
  register
);

// patch movie
router.patch("/:id", editOne);

// delete movie by id
router.delete("/:id", removeOne);

// Exportar las rutas
module.exports = router;
