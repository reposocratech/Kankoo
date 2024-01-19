var express = require("express");
const toursControllers = require("../controllers/toursControllers");
var router = express.Router();

router.post("/newtour", toursControllers.newTour);

module.exports = router;
