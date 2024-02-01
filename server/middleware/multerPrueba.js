const multer = require("multer");
function uploadImage() {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      let path = "";
      if (file.fieldname == "audios") {
        path = "/resources/audios/";
      } else if (file.fieldname == "images" || file.fieldname == "cover") {
        path = "/resources/images/";
      } else if (file.fieldname == "videos") {
        path = "/resources/videos/";
      }
      callback(null, `./public/${path}`);
    },

    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: "images" },
    { name: "audios" },
    { name: "videos" },
    { name: "cover" },
  ]);

  return upload;
}

module.exports = uploadImage;
