var express = require("express");
const usersControllers = require("../controllers/usersControllers");
var router = express.Router();
const multerSingle = require("../middleware/multerSingle");
//http://localhost:3000/users

router.post("/registeruser", usersControllers.registerUser);
router.post("/login", usersControllers.login);
router.get("/userprofile/:id", usersControllers.viewProfile);
router.get("/otheruser/:tourOwnerUserId", usersControllers.otherUser);
router.get("/mytours/:id", usersControllers.myTours);
router.get("/getonelike/:tour_id/:user_id", usersControllers.getOneLike);
router.post("/:id/favtours/:tour_id", usersControllers.favTours);
router.get("/:id/favtoursgallery", usersControllers.favToursGallery);
router.get(
  "/getoneacquired/:tour_id/:user_id",
  usersControllers.getOneAcquired
);
router.post("/:id/boughttours/:tour_id", usersControllers.boughtTours);
router.get("/:id/boughttoursgallery", usersControllers.boughtToursGallery);

router.put("/edituser", multerSingle("users"), usersControllers.editUser);
router.get("/viewotheruser/:id", usersControllers.viewOtherUser);

module.exports = router;
