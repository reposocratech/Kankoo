var express = require("express");
const usersControllers = require("../controllers/usersControllers");
var router = express.Router();

//http://localhost:3000/registeruser
router.post("/registeruser", usersControllers.registerUser);

module.exports = router;
