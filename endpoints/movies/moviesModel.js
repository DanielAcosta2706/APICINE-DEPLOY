// Requerir pool de conexiones
const pool = require("../../data/config");

const getAllMovies = async () => {
  const query = "SELECT * FROM movies";
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const getMovieWith = (string) => {
  const query = `SELECT * FROM movies WHERE name LIKE '%${string}%'`;
  try {
    return pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const getMovieById = async (id) => {
  const query = `SELECT * FROM movies WHERE id = ${id} LIMIT 1`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const registerMovie = async (movie) => {
  const query = `INSERT INTO movies SET ?`;
  try {
    return await pool.query(query, movie);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const editMovieById = async (id, movie) => {
  const query = `UPDATE movies SET ? WHERE id = ${id}`;
  try {
    return await pool.query(query, movie);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const deleteMovieById = async (id) => {
  const query = `DELETE FROM movies WHERE id = ${id}`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Exportar las consultas a la base de datos
module.exports = {
  getAllMovies,
  getMovieWith,
  getMovieById,
  registerMovie,
  editMovieById,
  deleteMovieById,
};
