var express = require("express");
const usersControllers = require("../controllers/usersControllers");
var router = express.Router();
const multerSingle = require("../middleware/multerSingle");
//http://localhost:3000/users

router.post("/registeruser", usersControllers.registerUser);
router.post("/login", usersControllers.login);
router.get("/userprofile/:id", usersControllers.viewProfile);
router.get("/otheruser:id", usersControllers.otherUser);
router.get("/mytours/:id", usersControllers.myTours);
router.post("/:id/favtours/:tour_id", usersControllers.favTours);
router.get("/boughttours", usersControllers.boughtTours);
router.get("/terms", usersControllers.terms);
router.get("/privacy", usersControllers.privacy);
router.put("/edituser", multerSingle("users"), usersControllers.editUser);
router.post("/:id/ratetour/:tour_id", usersControllers.rateTour);

module.exports = router;
