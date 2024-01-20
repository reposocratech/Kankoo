const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class toursControllers {
  newTour = (req, res) => {
    const {
      tour_name,
      tour_description,
      tour_acces,
      location,
      tour_city,
      user_id,
    } = JSON.parse(req.body.regTour);

    console.log(req);

    let sql = `INSERT INTO tour (tour_name, tour_description, tour_acces, location, tour_city, user_id) VALUES ("${tour_name}", "${tour_description}", "${tour_acces}", "${location}", "${tour_city}", ${user_id})`;

    let sqlTours = `SELECT * FROM tour WHERE user_id = ${user_id} AND tour_is_deleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) {
        // res.status(500).json(err);
        console.log("sqlllllllllllllllllll", sql);
        console.log(err);
      }
      console.log(result);

      connection.query(sqlTours, (errorTours, resultTours) => {
        if (errorTours) {
          // res.status(500).json(errorTours);
          console.log(errorTours);
          console.log("tourrsssssssssssssss", sqlTours);
        }
        res.status(200).json(resultTours);
      });
    });
    console.log(req.body.regTour);
  };
}

module.exports = new toursControllers();
