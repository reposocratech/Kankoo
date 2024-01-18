const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class toursControllers {
  newTour = (req, res) => {
    console.log("aqui puedes crear un nuevo tour");
  };
}

module.exports = new toursControllers();
