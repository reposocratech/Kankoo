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
      }
    });
  };

  addSection = (req, res) => {
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
      let type = null;
      if (resource_type == "image") {
        type = 1;
      } else if (resource_type == "audio") {
        type = 2;
      } else if (resource_type == "video") {
        type = 3;
      }

      let sql = `INSERT INTO section_resource (tour_id, section_id, resource_type, text) VALUES (${tour_id}, ${section_id}, ${type}, "${elem.filename}")`;
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
      }
    });
  };

  waiting = (req, res) => {
    const { email, msg, asunto } = req.body;
    main(email, msg, asunto);
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
      }
    });
  };

  disableTour = (req, res) => {
    const { tour_id } = req.params;

    let sql = `UPDATE tour SET tour_is_disabled = 1 WHERE tour_id = "${tour_id}"`;
    let sql2 = "SELECT * from tour where tour_is_disabled = 0";

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

    let sql = `UPDATE tour SET tour_is_disabled = 0 WHERE tour_id = "${tour_id}"`;
    let sql2 = "SELECT * from tour where tour_is_disabled = 1";

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

  viewOneTour = (req, res) => {
    const { tour_id } = req.params;

    let sql = `SELECT *
              FROM tour
              JOIN section on tour.tour_id = section.tour_id
              WHERE tour.tour_id = ${tour_id}`;
    connection.query(sql, (err, resultOneTour) => {
      if (err) {
        res.status(400).json({ err });
        console.log(err);
      } else {
        res.status(200).json({ resultOneTour, tour_id });
      }
    });
  };

  getOneRate = (req, res) => {
    const { tour_id, user_id } = req.params;

    let sql = `SELECT * FROM user_rates_tour WHERE tour_id = ${tour_id} AND user_id = ${user_id};`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  rateTour = (req, res) => {
    const { tour_id, id } = req.params;
    const { prevSelectedStars } = req.body;
    let checkSql = `SELECT * FROM user_rates_tour WHERE tour_id = ${tour_id} AND user_id = ${id};`;
    connection.query(checkSql, (checkErr, checkResult) => {
      if (checkErr) {
        res.status(500).json({ error: checkErr });
      } else {
        if (checkResult.length > 0) {
          let updateSql = `UPDATE user_rates_tour SET rating = ${prevSelectedStars} WHERE tour_id = ${tour_id} AND user_id = ${id};`;
          connection.query(updateSql, (updateErr, updateResult) => {
            if (updateErr) {
              res.status(500).json({ error: updateErr });
              console.log(updateErr);
            } else {
              res.status(200).json({ resultRated: updateResult });
            }
          });
        } else {
          let insertSql = `INSERT INTO user_rates_tour (tour_id, user_id, rating) VALUES (${tour_id}, ${id}, ${prevSelectedStars});`;
          connection.query(insertSql, (insertErr, insertResult) => {
            if (insertErr) {
              res.status(500).json({ error: insertErr });
              console.log(insertErr);
            } else {
              res
                .status(200)
                .json({ resultRated: insertResult, prevSelectedStars });
            }
          });
        }
      }
    });
  };

  delTour = (req, res) => {
    const { tour_id } = req.params;
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
  delSection = (req, res) => {
    const { section_id, tour_id } = req.params;

    let sql = `DELETE FROM section
WHERE tour_id = ${tour_id} AND section_id = ${section_id};

`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  editSection = (req, res) => {
    const { section_id } = req.params;
    const { section_name, section_description, travel_distance, tour_id } =
      JSON.parse(req.body.editSection);
    const resourceExist = JSON.parse(req.body.resourceExist);

    let sql = `UPDATE section
  SET section_name = "${section_name}",
      section_description ="${section_description}" ,
      travel_distance = ${Number(travel_distance)}
  WHERE tour_id = ${tour_id} AND section_id = ${section_id}`;

    if (req.files.cover) {
      sql = `UPDATE section
  SET section_name = "${section_name}",
      section_cover = "${req.files.cover[0].filename}",
      section_description ="${section_description}" ,
      travel_distance = ${Number(travel_distance)}
  WHERE tour_id = ${tour_id} AND section_id = ${section_id}`;
    }

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

    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      this.editSectionFiles(
        images,
        section_id,
        tour_id,
        resourceExist.images,
        resourceExist.image_id
      );
      this.editSectionFiles(
        audios,
        section_id,
        tour_id,
        resourceExist.audios,
        resourceExist.audio_id
      );
      this.editSectionFiles(
        videos,
        section_id,
        tour_id,
        resourceExist.videos,
        resourceExist.video_id
      );
      res.status(201).json({ section_id });
    });
  };

  editSectionFiles = (
    files,
    section_id,
    tour_id,
    resourceExist,
    resource_id
  ) => {
    files.forEach((elem) => {
      let resource_type = elem.mimetype.split("/")[0];

      if (resource_type == "image") {
        resource_type = 1;
      } else if (resource_type == "audio") {
        resource_type = 2;
      } else if (resource_type == "video") {
        resource_type = 3;
      }
      let sql = `UPDATE section_resource
      SET resource_type = ${resource_type},
      text = "${elem.filename}"
      WHERE tour_id = ${tour_id} AND section_id = ${section_id} and resource_id = ${resource_id}`;

      if (!resourceExist) {
        sql = `INSERT INTO section_resource (resource_type, text, tour_id, section_id) VALUES ( ${resource_type}, "${elem.filename}", ${tour_id}, ${section_id}) `;
      }

      connection.query(sql, (err, result) => {
        if (err) {
          // res.status(500).json(err);
          console.log(err);
        }
        console.log(result);
      });
    });
  };
  avgRating = (req, res) => {
    const { tour_id } = req.params;
    let sql = `SELECT AVG(rating) AS averageRating
      FROM user_rates_tour
      WHERE tour_id = ${tour_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        // res.status(500).json(err);
        console.log(err);
      }
      res.json({ averageRating: result[0].averageRating || null });
    });
  };
  totalDistance = (req, res) => {
    const { tour_id } = req.params;
    let sql = `SELECT SUM(section.travel_distance) as total_distance
                  FROM section
                  WHERE section.tour_id = ${tour_id}
                  GROUP BY section.tour_id;`;
    connection.query(sql, (err, resDistance) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ resDistance });
      }
    });
  };

  viewOneSectionsResources = (req, res) => {
    const { section_id, tour_id } = req.params;

    let sql = `SELECT * FROM section_resource
WHERE tour_id = ${tour_id} AND section_id = ${section_id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  getOneSection = (req, res) => {
    const { section_id, tour_id } = req.params;

    let sql = `SELECT * FROM section WHERE section_id = ${section_id} and tour_id = ${tour_id} `;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  };
  topTours = (req, res) => {
    let sql = `SELECT tour.*
      FROM tour
      LEFT JOIN user_rates_tour ON tour.tour_id = user_rates_tour.tour_id
      WHERE tour_is_deleted = 0
      GROUP BY tour.tour_id
      HAVING AVG(user_rates_tour.rating) >= 4;`;
    connection.query(sql, (err, topResult) => {
      if (err) {
        res.status(400).json({ err });
        console.log(err);
      } else {
        res.status(200).json({ topResult });
      }
    });
  };
}

module.exports = new toursControllers();
