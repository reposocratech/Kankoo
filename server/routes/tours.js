var express = require("express");
const toursControllers = require("../controllers/toursControllers");
var router = express.Router();

//ruta base http://localhost:3000/tours/
router.post("/newtour", toursControllers.newTour);

module.exports = router;
