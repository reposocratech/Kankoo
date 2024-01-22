var express = require("express");
const toursControllers = require("../controllers/toursControllers");
const multerSingle = require("../middleware/multerSingle");
const multerMulti = require("../middleware/multerMulti");

var router = express.Router();

//ruta base http://localhost:3000/tours/
router.post("/newtour", multerSingle("tours"), toursControllers.newTour);

router.put(
  "/addsection/:tour_id",
  multerMulti("section"),
  toursControllers.addSection
);
router.get("/waiting", toursControllers.waiting);
module.exports = router;
