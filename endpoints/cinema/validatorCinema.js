// Requerir a express-validator (dependencia)
const { check, validationResult } = require("express-validator");

// Crear validaciones
const validatorCreateCinema = [
  check("cinemaName")
    .exists()
    .withMessage("cinemaName is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("cinemaName must not be empty"),
  check("movieName")
    .exists()
    .withMessage("movieName is required")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("movieName must not be empty"),
  check("day")
    .exists()
    .withMessage("Day is required")
    .trim()
    .isDate()
    .withMessage("Day must to be: YYYY-MM-DD")
    .notEmpty()
    .withMessage("Day must not be empty"),
  check("language")
    .exists()
    .withMessage("Language is required")
    .trim()
    .isAlpha("es-ES", { ignore: " " })
    .notEmpty()
    .withMessage("Language must not be empty"),
  check("classification")
    .exists()
    .withMessage("Classification is required")
    .trim()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("Only letters")
    .notEmpty()
    .withMessage("Classification must not be empty")
    .isLength({ min: 1, max: 1 })
    .withMessage("Character count: Only 1"),

  (req, res, next) => {
    const errors = validationResult(req);
    !errors.isEmpty()
      ? res.status(400).json({ errores: errors.array() })
      : next();
  },
];

// Exportar validaciones
module.exports = {
  validatorCreateCinema,
};
