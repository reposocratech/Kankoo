var express = require("express");
const adminControllers = require("../controllers/adminControllers");
const router = express.Router();
const multerSingle = require("../middleware/multerSingle");

router.get("/getAllUsers", adminControllers.getAllUsers);
router.put("/disableUser/:id", adminControllers.disableUser);
router.put("/enableUser/:id", adminControllers.enableUser);
router.get("/getAllPics", adminControllers.getAllPics);
router.put("/disablePic/:id", adminControllers.disablePic);
router.put("enablePic/:id", adminControllers.enablePic);

module.exports = router;
