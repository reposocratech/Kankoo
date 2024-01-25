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
        res.status(400).json({ err });
        console.log(err);
      } else {
        let tour_id = result.insertId;

        res.status(200).json({ result, cover, tour_id });
        // main();
        console.log(result);
      }
    });
  };

  addSection = (req, res) => {
    console.log("files del ADD SECTION", req.files);
    const { section_name, section_description, travel_distance, tour_id } =
      JSON.parse(req.body.addSection);

    let sql_cont = `SELECT max(section_id) as id from section where tour_id = ${tour_id}`;

    connection.query(sql_cont, (err, result_id) => {
      if (err) {
        console.log(err);
      } else {
        let section_id = result_id[0].id;

        if (section_id == null) {
          section_id = 1;
        } else {
          section_id++;
        }
        const { filename } = req.files.cover[0];
        let sql = `INSERT INTO section (tour_id, section_id, section_name, section_cover, section_description, travel_distance) VALUES ( ${tour_id} , ${section_id} ," ${section_name}", "${filename}", "${section_description}", ${Number(
          travel_distance
        )})`;

        let images = [];
        if (req.files.images) {
          images = req.files.images;
        }
        let audios = [];
        if (req.files.audios) {
          audios = req.files.audios;
        }
        let videos = [];
        if (req.files.videos) {
          videos = req.files.videos;
        }

        console.log("ESTO ES EL REQ FILESSSSSSSSSS", req.files);

        connection.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          }

          res.status(201).json({ section_id });

          this.saveSectionFiles(images, section_id, tour_id);
          this.saveSectionFiles(audios, section_id, tour_id);
          this.saveSectionFiles(videos, section_id, tour_id);
        });
      }
    });
  };

  saveSectionFiles = (files, section_id, tour_id) => {
    files.forEach((elem) => {
      let resource_type = elem.mimetype.split("/")[0];

      if (resource_type == "image") {
        resource_type = 1;
      } else if (resource_type == "audio") {
        resource_type = 2;
      } else if (resource_type == "video") {
        resource_type = 3;
      }

      let sql = `INSERT INTO section_resource (tour_id, section_id, resource_type, text) VALUES (${tour_id}, ${section_id}, ${resource_type}, "${elem.filename}")`;
      connection.query(sql, (err, result) => {
        if (err) {
          // res.status(500).json(err);
          console.log(err);
        }
        console.log(result);
      });
    });
  };

  editTour = (req, res) => {
    console.log("Body de la solicitud:", req.body);

    const {
      tour_name,
      tour_description,
      tour_acces,
      location,
      tour_city,
      tour_id,
    } = JSON.parse(req.body.editTour);

    let sql = `UPDATE tour set tour_name = "${tour_name}" , tour_description = "${tour_description}", tour_acces = "${tour_acces}", location = "${location}", tour_city = "${tour_city}"  WHERE tour_id = ${tour_id} `;

    let cover;

    if (req.file) {
      cover = req.file.filename;
      sql = `UPDATE tour set tour_name = "${tour_name}" , tour_description = "${tour_description}", tour_acces = "${tour_acces}", location = "${location}", tour_city = "${tour_city}", cover = "${cover}"  WHERE tour_id = ${tour_id} `;
    }
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ err });
        console.log(err);
      } else {
        res.status(200).json({ result, cover });
        console.log("Resultado de la consulta SQL:", result);
      }
    });
  };

  waiting = (req, res) => {
    console.log("espera a que confirmen tu guía");
  };

  allTours = (req, res) => {
    let sql = `SELECT * from tour WHERE tour_is_deleted = 0`;
    connection.query(sql, (err, resultTours) => {
      if (err) {
        res.status(400).json({ err });
        console.log(err);
      } else {
        let tour_id = resultTours.insertId;
        res.status(200).json({ resultTours, tour_id });
        console.log(resultTours);
      }
    });
  };

  disableTour = (req, res) => {
    console.log(req.params);

    const { tour_id } = req.params;
    console.log(tour_id);
    let sql = `UPDATE tour SET is_deleted = true WHERE tour_id = "${id}"`;
    let sql2 = "SELECT * from tour where tour_is_disabled = false";

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

  enableTour = (req, res) => {
    const { tour_id } = req.params;
    console.log(tour_id);
    let sql = `UPDATE tour SET is_deleted = false WHERE tour_id = "${id}"`;
    let sql2 = "SELECT * from tour where tour_is_disabled = true";

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

  viewOneTour = (req, res) => {
    const { tour_id } = req.params;
    /*     let sql = `SELECT * 
                FROM tour
	              JOIN section on tour.tour_id = section.tour_id
                JOIN section_resource on section.tour_id = section_resource.tour_id
                    AND section.section_id = section_resource.section_id
                WHERE tour.tour_id = ${tour_id}`; */
    let sql = `SELECT *
              FROM tour
              JOIN section on tour.tour_id = section.tour_id
              WHERE tour.tour_id = ${tour_id}`;

    connection.query(sql, (err, resultOneTour) => {
      if (err) {
        res.status(400).json({ err });
        /*         console.log(err); */
      } else {
        console.log("-------------------", resultOneTour);
        res.status(200).json({ resultOneTour, tour_id });
      }
    });
  };
  rateTour = (req, res) => {
    const { tour_id, id } = req.params;
    let sql = `UPDATE user_rates_tour set rating=${rating} WHERE tour_id=${tour_id} and user_id = ${user_id}`;
    console.log("rating");
  };

  delTour = (req, res) => {
    const { tour_id } = req.params;
    console.log("req params back", req.params);
    let sql = `UPDATE tour SET tour_is_deleted = true
WHERE tour_id = ${tour_id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  };
}

module.exports = new toursControllers();
