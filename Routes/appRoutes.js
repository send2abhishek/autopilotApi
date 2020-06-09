const express = require("express");
const route = express.Router();
const controller = require("../Controllers/appController");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();

    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".pdf" && ext !== ".doc" && ext !== ".xlsx") {
      return callback(new Error("Only documents files are allowed"));
    }
    callback(null, true);
  },
  limits: {
    //file size limited to 5mb
    fileSize: 1024 * 1024 * 5,
  },
});

// all routes
route.post("/file", upload.single("name"), controller.uploadFile);
route.get("/", controller.getUploadedFiles);

// all routes
route.post("/file", upload.single("name"), controller.uploadFile);
route.get("/convertToCanonicalData", controller.convertToCanonicalData);

module.exports = route;
