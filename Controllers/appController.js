const itemModel = require("../Models/itemModel");
const mongoose = require("mongoose");
const config = require("config");
const uploadFile = async (req, res, next) => {
  try {
    const Id = new mongoose.Types.ObjectId();
    const title = req.body.title;
    const filePath = `${req.headers.host}/uploads/${req.file.originalname}`;
    console.log("FilePath ::: ",filePath)
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
const xlsxFile  = require('read-excel-file/node');

const getUploadedFiles = async (req, res, next) => {
  try {
    const getItem = await itemModel.find({}, { __v: 0 });

    res.status(200).json(getItem);
  } catch (ex) {
    throw new Error(err);
  }
};

const convertToCanonicalData = async (req, res, next) => {
  try {
    console.log("chang to canonical format");
   //let systemInfo;

   var systemInfo = {} // empty Object
   var key = 'System metadata Details';
   systemInfo[key] = []; // empty Array, which you can push() values into
   


    const filePath ='C:/AAP/autopilotApi/uploads/Sample1.xlsx';
    xlsxFile(filePath).then((rows) => {
     
      for(let val of rows) {
  
           let SystemDetails = { 
            SystemName : val[0], 
            OperationSystem : val[1], 
            Capacity:val[2] ,
            RAM:val[3],
            ROM:val[4],
            
     }; 

     systemInfo[key].push(SystemDetails);
    }
      
    })
    let SystemDetails = { 
      SystemName : "System1", 
      OperationSystem : "Windows", 
      Capacity:"250GB" ,
      RAM:"4",
      ROM:"1",}
      systemInfo[key].push(SystemDetails);
    console.log("json details "+JSON.stringify(systemInfo))
    res.status(200).json({
      message: "File Read sucessfully",
      systemInfo,
     
    });
   
  } catch (err) {
    throw new Error(err);
  }
};


module.exports = {
  uploadFile,
  convertToCanonicalData,
  getUploadedFiles,
};
