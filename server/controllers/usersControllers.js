const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class usersControllers {
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
    console.log("aqui puedes editar tu usuario");
  };
}

module.exports = new usersControllers();
