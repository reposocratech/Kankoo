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
    } = JSON.parse(req.body.addTour);

    let cover;

    if (req.file) {
      cover = req.file.filename;
    }

    let sql = `INSERT INTO tour (tour_name, tour_description, tour_acces, location, tour_city,user_id, cover) VALUES ("${tour_name}", "${tour_description}", "${tour_acces}", "${location}", "${tour_city}", ${user_id} , "${cover}")`;

    connection.query(sql, (err, result) => {
      if (err) {
        // res.status(500).json(err);
        res.status(400).json({ err });
        console.log(err);
      } else {
        res.status(200).json({ result, cover });
        console.log(result);
      }

      /* let sqlTours = `SELECT * FROM tour WHERE user_id = ${user_id} AND tour_is_deleted = 0`; */

      /*  connection.query(sqlTours, (errorTours, resultTours) => {
         if (errorTours) {
           // res.status(500).json(errorTours);
           console.log(errorTours);
           console.log("tourrsssssssssssssss", sqlTours);
         }
         res.status(200).json(resultTours);
       });
     });
     console.log(req.body.regTour); */
    });
  };

  addSection = (req, res) => {
    const { tour_id, section_id, section_name, section_description } =
      req.params;

    let sql = `INSERT INTO section (tour_id, section_id, section_name, section_description, travel_distance)
VALUES ( ${tour_id} , ${section_id} , '${section_name}', '${section_description}'', 10); `;

    connection.query(sql, (err, result) => {
      if (err) {
        // res.status(500).json(err);
        res.status(400).json({ err });
        console.log(err);
      } else {
        res.status(200).json({ result, cover });
        console.log(result);
      }
    });
  };
  waiting = (req, res) => {
    console.log("espera a que confirmen tu guía");
  };
}

module.exports = new toursControllers();
