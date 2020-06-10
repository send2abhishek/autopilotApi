const itemModel = require("../Models/itemModel");
const mongoose = require("mongoose");
const config = require("config");
const path = require('path');

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

const getUploadedFiles = async (req, res, next) => {
  try {
    const getItem = await itemModel.find({}, { __v: 0 });

    res.status(200).json(getItem);
  } catch (ex) {
    throw new Error(err);
  }
};

//API method to download a sample template from local directory
const DownloadTemplate = async (req,res, next)=>{
  try{
    var file = req.params.file;//file name
    console.log("filename is :",file)//testing
    var fileLocation = path.join('./Templates',file);//the path where the file is located
    console.log(fileLocation);//testing
    res.download(fileLocation, file);  //inbuilt download method that executes and downloads the file   
  }
  catch (ex) {
    throw new Error(ex.message);
  }
    
};

module.exports = {
  uploadFile,
  getUploadedFiles,
  DownloadTemplate
};
