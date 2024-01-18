const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class usersControllers {
  registerUser = (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    let saltRounds = 8;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          let sql = `INSERT INTO user (first_name, last_name, email, password) VALUES ("${first_name}", "${last_name}", "${email}", "${hash}")`;

          connection.query(sql, (error, result) => {
            console.log(error);
            error
              ? res.status(500).json({ error })
              : res.status(200).json(result);
          });
        }
      });
    });
    console.log(req.body);
  };

  viewProfile = (req, res) => {
    console.log("este es tu perfil personal");
  };
  ownTours = (req, res) => {
    console.log("estas son mis guías");
  };
  favTours = (req, res) => {
    console.log("estas son mis guías favoritas");
  };
  boughtTours = (req, res) => {
    console.log("estas son mis guías adquiridas");
  };
  editUser = (req, res) => {
    const { first_name, last_name, birthdate, user_id } = JSON.parse(
      req.body.editUser
    );
    let sql = `UPDATE user SET first_name = "${first_name}", last_name = "${last_name}", birthdate = "${birthdate}" WHERE user_id = ${user_id}  `;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ err });
      } else {
        res.status(200).json({ result });
      }
    });
  };
  terms = (req, res) => {
    console.log("terminos y condiciones");
  };
  privacy = (req, res) => {
    console.log("esta es la pagina de privacidad");
  };

  otherUser = (req, res) => {
    const user_id = req.params.id;
    let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND user_is_deleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json({ result });
      }
    });
  };
}

module.exports = new usersControllers();
