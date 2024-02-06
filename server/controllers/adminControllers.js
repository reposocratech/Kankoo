const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class adminControllers {
  getAllUsers = (req, res) => {
    let sql =
      "SELECT * FROM user WHERE user_type = 2 ORDER BY user_is_deleted DESC";
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  getOneUser = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM user WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json(result[0]);
      }
    });
  };

  //deshabilita un usuario
  disableUser = (req, res) => {
    let { id } = req.params;

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
    let { id } = req.params;

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

    let sql = `UPDATE tour SET tour_is_deleted = 1 WHERE tour_id = "${tour_id}"`;
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

    let sql = `UPDATE tour SET tour_is_deleted = 0 WHERE tour_id = "${tour_id}"`;
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
  everyTour = (req, res) => {
    let sql = `SELECT * FROM tour
    ORDER BY tour_is_deleted DESC, tour_id DESC`;
    connection.query(sql, (err, resultEveryTour) => {
      if (err) {
        res.status(400).json({ err });
        console.log(err);
      } else {
        res.status(200).json({ resultEveryTour });
      }
    });
  };
}

module.exports = new adminControllers();
