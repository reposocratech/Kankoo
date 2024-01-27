const multer = require("multer");
function uploadImage() {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      /*    console.log(file); */
      let path = "";
      if (file.fieldname == "audios") {
        path = "/resources/audios/";
      } else if (file.fieldname == "images" || file.fieldname == "cover") {
        path = "/resources/images/";
      } else if (file.fieldname == "videos") {
        path = "/resources/videos/";
      }
      callback(null, `./public/${path}`);

      /*       let folder_type;
      console.log(req);
      console.log(file); */
      /* 
      if (file.mimetype.startsWith("image/")) {
        folder_type = "images";
      } else if (file.mimetype.startsWith("video/")) {
        folder_type = "videos";
      } else if (file.mimetype.startsWith("audio/")) {
        folder_type = "audios";
      } */

      /*    callback(null, `./public/${folder}/${folder_type}`); */
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
