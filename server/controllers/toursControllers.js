const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const main = require("../utils/nodemailer");
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
        let tour_id = result.insertId;

        res.status(200).json({ result, cover, tour_id });
        main();
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
    console.log(req.body);

    const { section_name, section_description, travel_distance, tour_id } =
      req.body;

    let sql_cont = `SELECT max(section_id) as id from section where tour_id = ${tour_id}`;

    connection.query(sql_cont, (err, result_id) => {
      if (err) {
        console.log(err);
      } else {
        let id = result_id[0].id;
        console.log(id);
        if (id == null) {
          id = 1;
        } else {
          id++;
        }
        let sql = `INSERT INTO section (tour_id,section_id, section_name, section_description, travel_distance) VALUES ( ${tour_id} , ${id} ," ${section_name}", "${section_description}", ${Number(
          travel_distance
        )}); `;
        connection.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          }
          res.status(201).json({ section_id: id });
        });
      }
    });

    /*   connection.query(sql, (err, result) => {
      if (err) {
        // res.status(500).json(err);
        res.status(400).json(err);
        console.log(err);
      } else {
        let section_id = result.insertId;
        res.status(200).json(result);
        console.log(result);
      }
    }); */
  };
  waiting = (req, res) => {
    console.log("espera a que confirmen tu guía");
  };
  allTours = (req, res) => {
    let sql = `SELECT * from tour`;
    connection.query(sql, (err, resultTravels) => {
      if (err) {
        res.status(400).json({ err });
        console.log(err);
      } else {
        let tour_id = resultTravels.insertId;
        res.status(200).json({ resultTravels, tour_id });
        console.log(resultTravels);
      }
    });
  };
}

module.exports = new toursControllers();
