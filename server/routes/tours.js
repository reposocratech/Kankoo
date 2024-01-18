var express = require("express");
const toursControllers = require("../controllers/toursControllers");
var router = express.Router();

router.get("/newtour", toursControllers.newTour);

module.exports = router;
