"use strict";
const express = require("express");
const app = express();
const helmet = require("helmet"); //For securing Express apps by setting various HTTP headers
const { PORT } = require("./config/config");
app.use(helmet()); // Using Helmet in Middleware For securing Express apps by setting various HTTP headers
app.use(express.json());
const connectDB = require("./config/mongodb.config");

connectDB();

//Model
const CollegeModel = require("./model/collegeModel");
const StudentModel = require("./model/studentModel");




//create college
app.post("/college",async (req, res) => {
    try {

        let data={
            name:req.body.name,
            location:req.body.location?req.body.location:"",
            establishedYear:req.body.establishedYear,
        }
        
        let insertData=await CollegeModel.create(data);
        res.status(201).json({
            status: true,
            message: "Data inserted successfully",
            data:insertData
        });
    } catch (error) {
        res.status(500).json({
			status: false,
			message: "server error",
			error: error,
		});
    }
});
//get all college
app.get("/college",async (req, res) => {
    try {
        
        let data=await CollegeModel.find()
        // .skip(req.body.offset)
        .sort({ createdAt: -1 })
        .limit(25);
        res.status(201).json({
            status: true,
            message: "Data fetched successfully",
            data:data
        });
    } catch (error) {
        res.status(500).json({
			status: false,
			message: "server error",
			error: error,
		});
    }
});


//create student
app.post("/student",async (req, res) => {
    try {

        let data=req.body;
        
        let insertData=await StudentModel.create(data);
        res.status(201).json({
            status: true,
            message: "Data inserted successfully",
            data:insertData
        });
    } catch (error) {
        res.status(500).json({
			status: false,
			message: "server error",
			error: error,
		});
    }
});
//get all student
app.get("/student",async (req, res) => {
    try {
        
        let data=await StudentModel.find()
        // .skip(req.body.offset)
        .sort({ createdAt: -1 })
        .limit(25);
        res.status(201).json({
            status: true,
            message: "Data fetched successfully",
            data:data
        });
    } catch (error) {
        res.status(500).json({
			status: false,
			message: "server error",
			error: error,
		});
    }
});


//advanced query
app.get("/fetch-college-student",async  (req, res) => {
    try {
        
        let data=await StudentModel.find().populate("collegeId");
        CollegeModel.aggregate([
            {
              $lookup: {
                from: 'students',
                localField: '_id',
                foreignField: 'collegeId',
                as: 'students'
              }
            },
            {
              $project: {
                name: 1,
                location: 1,
                establishedYear: 1,
                students: 1
              }
            }
          ])  .then(colleges => {
            // console.log(colleges);
            res.status(201).json({
                status: true,
                message: "Data fetched successfully",
                studentWithCollegeDetails:data,
                collegeWithStudentDetails:colleges,
            });
          })
          .catch(error => {
            console.error(error);
          });
    } catch (error) {
        res.status(500).json({
			status: false,
			message: "server error",
			error: error,
		});
    }
});



app.get("/health",  (req, res) =>
  res.send({ message: "Dummy server is Running!" })
);

app.get("*", function (req, res) {
  res.status(404).send("Invalid URL..");
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});