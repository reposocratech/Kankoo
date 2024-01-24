const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class adminControllers {
  getAllUsers = (req, res) => {
    let sql = "SELECT * FROM user where type = 2";
    connection.query(sql, (error, result) => {
      console.log(result);
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };
  //deshabilita un usuario
  disableUser = (req, res) => {
    console.log(req.params);

    let { id } = req.params;
    console.log(id);
    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = "${id}"`;
    let sql2 = "SELECT * from user where type=2";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultUsers) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultUsers);
    });
  };

  enableUser = (req, res) => {
    console.log(req.params);

    let { id } = req.params;
    console.log(id);
    let sql = `UPDATE user SET is_deleted = 0 WHERE user_id = "${id}"`;
    let sql2 = "SELECT * from user where type = 2";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultUsers) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultUsers);
    });
  };

  //trae todas las fotos de los usuarios
  getAllPics = (req, res) => {
    let sql = "SELECT * FROM avatar";
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new adminControllers();
