// Requerir Router de express
const router = require("express").Router();

// Requerir controladores
const {
  listAll,
  listOne,
  editOne,
  removeOne,
  register,
} = require("./cinemaControl");

// Requerir validaciones
const { validatorCreateCinema } = require("./validatorCinema");

// Requerir carga de archivos
const fileUploadCinema = require("./handleStorageCinema");

// Rutas
// get all cinema
router.get("/", listAll);

// get cinema by id
router.get("/:id", listOne);

// Register new cinema
router.post(
  "/register",
  fileUploadCinema.single("file"),
  validatorCreateCinema,
  register
);

// patch cinema
router.patch("/:id", editOne);

// delete cinema by id
router.delete("/:id", removeOne);

// Exportar las rutas
module.exports = router;
