var express = require("express");
const usersControllers = require("../controllers/usersControllers");
var router = express.Router();

//http://localhost:3000/users/registeruser
router.post("/registeruser", usersControllers.registerUser);
router.get("/userprofile", usersControllers.viewProfile);
router.get("/mytours", usersControllers.ownTours);
router.get("/favtours", usersControllers.favTours);
router.get("/boughttours", usersControllers.boughtTours);
router.put("/edituser", usersControllers.editUser);

module.exports = router;
