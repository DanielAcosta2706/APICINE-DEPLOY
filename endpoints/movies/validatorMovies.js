// Requerir a express-validator (dependencia)
const { check, validationResult } = require("express-validator");

// Crear validaciones
const validatorCreateMovie = [
  check("name")
    .exists()
    .withMessage("Name is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Name must not be empty"),
  check("cinema")
    .exists()
    .withMessage("Cinema is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Cinema must not be empty"),
  check("description")
    .exists()
    .withMessage("Description is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Description must not be empty"),
  check("day")
    .exists()
    .withMessage("Day is required")
    .trim()
    .isDate()
    .withMessage("Day must to be: YYYY-MM-DD")
    .notEmpty()
    .withMessage("Day must not be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    !errors.isEmpty()
      ? res.status(400).json({ errores: errors.array() })
      : next();
  },
];

// Exportar validaciones
module.exports = {
  validatorCreateMovie,
};
