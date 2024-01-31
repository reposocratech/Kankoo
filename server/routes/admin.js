var express = require("express");
const adminControllers = require("../controllers/adminControllers");
const router = express.Router();
const multerSingle = require("../middleware/multerSingle");

router.get("/getAllUsers", adminControllers.getAllUsers);
router.put("/disableUser/:id", adminControllers.disableUser);
router.put("/enableUser/:id", adminControllers.enableUser);
router.get("/getAllPics", adminControllers.getAllPics);
router.put("/enableTour/:tour_id", adminControllers.enableTour);
router.put("/disableTour/:tour_id", adminControllers.disableTour);
router.put(
  "/admin/updateUserIsDeletedStatus/:id",
  adminControllers.updateUserIsDeletedStatus
);
router.get("/getOneUser/:id", adminControllers.getOneUser);
router.get("/everyTour", adminControllers.everyTour);
module.exports = router;
