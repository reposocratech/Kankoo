const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class adminControllers {
  getAllUsers = (req, res) => {
    let sql = "SELECT * FROM user WHERE user_type = 2";
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
    let sql = `UPDATE user SET user_is_deleted = 1 WHERE user_id = "${id}"`;
    let sql2 = "SELECT * from user where user_type=2";

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
    let sql = `UPDATE user SET user_is_deleted = 0 WHERE user_id = "${id}"`;
    let sql2 = "SELECT * from user where user_type = 2";

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

  disableTour = (req, res) => {
    const { tour_id } = req.params;
    console.log(tour_id);
    let sql = `UPDATE tour SET tour_is_disabled = 1 WHERE tour_id = "${tour_id}"`;
    let sql2 = "SELECT * from tour ";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultTours) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultTours);
    });
  };

  enableTour = (req, res) => {
    const { tour_id } = req.params;
    console.log(tour_id);
    let sql = `UPDATE tour SET tour_is_disabled = 0 WHERE tour_id = "${tour_id}"`;
    let sql2 = "SELECT * from tour";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultTours) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultTours);
    });
  };

  updateUserIsDeletedStatus = (req, res) => {
    const { id } = req.params;
    const { user_is_deleted } = req.body;

    const sql = `UPDATE user SET user_is_deleted = ${user_is_deleted} WHERE user_id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json(result);
      }
    });
  };
}

module.exports = new adminControllers();
