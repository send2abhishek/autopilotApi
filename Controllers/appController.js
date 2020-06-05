const itemModel = require("../Models/itemModel");
const mongoose = require("mongoose");
const config = require("config");
const uploadFile = async (req, res, next) => {
  try {
    const Id = new mongoose.Types.ObjectId();
    const title = req.body.title;
    const filePath = `${req.headers.host}/uploads/${req.file.originalname}`;
    const item = new itemModel({
      _id: Id,
      avatar: filePath,
      title: req.body.title,
    });

    item
      .save()
      .then((result) => {
        res.status(201).json({
          msg: config.get("fileUpload"),
          id: Id,
          title,
          filePath,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: config.get("error"),
          info: error.message,
        });
      });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  uploadFile,
};
