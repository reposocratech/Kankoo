const connection = require("../config/db");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  };

  viewProfile = (req, res) => {
    const user_id = req.params.id;

    let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND user_is_deleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json({ result: result[0] });
      }
    });
  };

  myTours = (req, res) => {
    const user_id = req.params.id;
    let sql = `SELECT * FROM tour WHERE user_id = ${user_id} AND tour_is_deleted = false`;
    connection.query(sql, (err, resultMyTours) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json({ resultMyTours });
      }
    });
  };

  getOneLike = (req, res) => {
    const { tour_id, user_id } = req.params;

    let sql = `SELECT * FROM user_likes_tour WHERE tour_id = ${tour_id} AND user_id = ${user_id};`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  getOneAcquired = (req, res) => {
    const { tour_id, user_id } = req.params;

    let sql = `SELECT * FROM user_acquires_tour WHERE tour_id = ${tour_id} AND user_id = ${user_id};`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  favTours = (req, res) => {
    const { id, tour_id } = req.params;
    const { liked } = req.body;

    let checkSql = `SELECT * FROM user_likes_tour WHERE tour_id = ${tour_id} AND user_id = ${id};`;

    connection.query(checkSql, (checkErr, checkResult) => {
      if (checkErr) {
        res.status(500).json({ error: checkErr });
      } else {
        if (checkResult.length > 0) {
          let updateSql = `UPDATE user_likes_tour SET liked = ${liked} WHERE tour_id = ${tour_id} AND user_id = ${id};`;

          connection.query(updateSql, (updateErr, updateResult) => {
            if (updateErr) {
              res.status(500).json({ error: updateErr });
              console.log(updateErr);
            } else {
              res.status(200).json({ resultLiked: updateResult });
              console.log("Like actualizado:", updateResult);
            }
          });
        } else {
          let insertSql = `INSERT INTO user_likes_tour (tour_id, user_id, liked) VALUES (${tour_id}, ${id}, ${liked});`;

          connection.query(insertSql, (insertErr, insertResult) => {
            if (insertErr) {
              res.status(500).json({ error: insertErr });
              console.log(insertErr);
            } else {
              res.status(200).json({ resultLiked: insertResult, liked });
              console.log("Nuevo like insertado:", insertResult);
            }
          });
        }
      }
    });
  };
  boughtTours = (req, res) => {
    const { id, tour_id } = req.params;
    const { acquired } = req.body;
    let checkSql = `SELECT * FROM user_acquires_tour WHERE tour_id = ${tour_id} AND user_id = ${id};`;

    connection.query(checkSql, (checkErr, checkResult) => {
      if (checkErr) {
        res.status(500).json({ error: checkErr });
      } else {
        if (checkResult.length > 0) {
          let updateSql = `UPDATE user_acquires_tour SET acquired = ${acquired} WHERE tour_id = ${tour_id} AND user_id = ${id};`;

          connection.query(updateSql, (updateErr, updateResult) => {
            if (updateErr) {
              res.status(500).json({ error: updateErr });
              console.log(updateErr);
            } else {
              res.status(200).json({ resultAcquired: updateResult });
              console.log("Adquirido actualizado:", updateResult);
            }
          });
        } else {
          let insertSql = `INSERT INTO user_acquires_tour (tour_id, user_id, acquired) VALUES (${tour_id}, ${id}, ${acquired});`;

          connection.query(insertSql, (insertErr, insertResult) => {
            if (insertErr) {
              res.status(500).json({ error: insertErr });
              console.log(insertErr);
            } else {
              res.status(200).json({ resultAcquired: insertResult, acquired });
              console.log("Nuevo adquirido insertado:", insertResult);
            }
          });
        }
      }
    });
  };

  editUser = (req, res) => {
    const { first_name, last_name, user_language, user_id } = JSON.parse(
      req.body.editUser
    );
    let sql = `UPDATE user SET first_name = "${first_name}", last_name = "${last_name}", user_language = "${user_language}" WHERE user_id = ${user_id}  `;

    let avatar;

    if (req.file) {
      avatar = req.file.filename;
      sql = `UPDATE user SET first_name = "${first_name}", last_name = "${last_name}", user_language = "${user_language}", avatar = "${avatar}" WHERE user_id = ${user_id} `;
    }

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ err });
        console.log(err);
      } else {
        res.status(200).json({ result, avatar });
        console.log(result);
      }
    });
  };

  otherUser = (req, res) => {
    const user_id = req.params.tourOwnerUserId;
    let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND user_is_deleted = 0`;

    connection.query(sql, (err, userDetails) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        res.status(200).json({ userDetails });
        console.log("DATILLOOOOOOOOOOOOOOOOS", { userDetails });
      }
    });
  };

  login = (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email = '${email}'`;
    connection.query(sql, (error, result) => {
      if (error) return res.status(500).json(error);

      if (!result || result.length === 0) {
        res.status(401).json("Email no registrado");
      } else {
        const user = result[0];

        if (user.user_is_deleted == 1) {
          res
            .status(401)
            .json("La cuenta ha sido bloqueada por el administrador");
        } else {
          const hash = user.password;
          bcrypt.compare(password, hash, (error, response) => {
            if (error) return res.status(500).json(error);
            if (response == true) {
              const token = jwt.sign(
                {
                  user: {
                    id: user.user_id,
                    type: user.user_type,
                    prueba: "hola",
                  },
                },
                process.env.SECRET,
                { expiresIn: "1d" }
              );

              res.status(200).json({ token, user });
            } else {
              res.status(401).json("Contraseña no válida");
            }
          });
        }
      }
    });
  };
  favToursGallery = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT tour.tour_id, tour.tour_name, tour.tour_city, tour.cover, user_likes_tour.user_id
              FROM tour
                JOIN user_likes_tour ON tour.tour_id = user_likes_tour.tour_id
              WHERE user_likes_tour.liked = true
              AND user_likes_tour.user_id = ${id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json({ result });
      }
    });
  };
  boughtToursGallery = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT tour.tour_id, tour.tour_name, tour.tour_city, tour.cover, user_acquires_tour.user_id
              FROM tour
                JOIN user_acquires_tour ON tour.tour_id = user_acquires_tour.tour_id
              WHERE user_acquires_tour.acquired = true
              AND user_acquires_tour.user_id = ${id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json({ result });
      }
    });
  };
  viewOtherUser = (req, res) => {
    const user_id = req.params.id;
    let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND user_is_deleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json({ result: result[0] });
      }
    });
  };
}

module.exports = new usersControllers();
