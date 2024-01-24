const multer = require("multer");
function uploadImage(a) {
  const storage = multer.diskStorage({
    destination: `./public/images/${a}`,

    filename: function (req, file, callback) {
      console.log(file);
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("file");

  return upload;
}

module.exports = uploadImage;
