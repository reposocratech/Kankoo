var express = require("express");
const toursControllers = require("../controllers/toursControllers");
const multerSingle = require("../middleware/multerSingle");
const multerMulti = require("../middleware/multerMulti");

var router = express.Router();

//ruta base http://localhost:3000/tours/
router.post("/newtour", multerSingle("tours"), toursControllers.newTour);
router.get("/waiting", toursControllers.waiting);
router.post("/addsection", toursControllers.addSection);

router.put(
  "/addPics/:tour_id",
  multerMulti("imgsection"),
  toursControllers.addPics
);

module.exports = router;
