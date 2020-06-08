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

const convertToCanonicalData = async (req, res, next) => {
  try {
    console.log("chang to canonical format");
  
    const filePath ='C:/AAP/autopilotApi/uploads/Sample1.xlsx';
    xlsxFile(filePath).then((rows) => {
      console.log(rows);
    })

     

    // STEP 1: Reading JSON file 
    const users = require("./users"); 
    
    // Defining new user 
    let user = { 
      name: "New User", 
      age: 30, 
      language: ["PHP", "Go", "JavaScript"] 
    }; 
    
    // STEP 2: Adding new data to users object 
    users.push(user); 
    
    // STEP 3: Writing to a file 
    fs.writeFile("users.json", JSON.stringify(users), err => { 
      
      // Checking for errors 
      if (err) throw err; 
    
      console.log("Done writing"); // Success 
    }); 
    


    res.status(200).json({
      message: "File Read sucessfully",
     
    });
   
  } catch (err) {
    throw new Error(err);
  }
};


module.exports = {
  uploadFile,
  convertToCanonicalData,
};
