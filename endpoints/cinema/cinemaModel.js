// Requerir pool de conexiones
const pool = require("../../data/config");

const getAllCinema = async () => {
  const query = "SELECT * FROM cinema";
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const getCinemaWith = (string) => {
  const query = `SELECT * FROM cinema WHERE cinemaName LIKE '%${string}%'`;
  try {
    return pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const getCinemaById = async (id) => {
  const query = `SELECT * FROM cinema WHERE id = ${id} LIMIT 1`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const registerCinema = async (cinema) => {
  const query = `INSERT INTO cinema SET ?`;
  try {
    return await pool.query(query, cinema);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const editCinemaById = async (id, cinema) => {
  const query = `UPDATE cinema SET ? WHERE id = ${id}`;
  try {
    return await pool.query(query, cinema);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const deleteCinemaById = async (id) => {
  const query = `DELETE FROM cinema WHERE id = ${id}`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

// Exportar las consultas a la base de datos
module.exports = {
  getAllCinema,
  getCinemaWith,
  getCinemaById,
  registerCinema,
  editCinemaById,
  deleteCinemaById,
};
