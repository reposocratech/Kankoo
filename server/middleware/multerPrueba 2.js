const multer = require("multer");
function uploadImage(folder) {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      let folder_type;
      console.log(req);
      console.log(file);

      if (file.mimetype.startsWith("image/")) {
        folder_type = "images";
      } else if (file.mimetype.startsWith("video/")) {
        folder_type = "videos";
      } else if (file.mimetype.startsWith("audio/")) {
        folder_type = "audios";
      }

      callback(null, `./public/${folder}/${folder_type}`);
    },

    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: "images" },
    { name: "audios" },
  ]);

  return upload;
}

module.exports = uploadImage;
