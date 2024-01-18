var express = require("express");
const usersControllers = require("../controllers/usersControllers");
var router = express.Router();

//http://localhost:3000/registeruser
router.post("/registeruser", usersControllers.registerUser);
router.post("/login", usersControllers.login);
router.get("/userprofile", usersControllers.viewProfile);
router.get("/mytours", usersControllers.ownTours);
router.get("/favtours", usersControllers.favTours);
router.get("/boughttours", usersControllers.boughtTours);
router.get("/edituser", usersControllers.editUser);

module.exports = router;
