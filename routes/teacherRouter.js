const express = require("express");
var mongoose = require("mongoose");

const teacherModel = require("../models/teacherModel");
let router = express.Router();

router.post("/", async (req, res) => {
  const teacher = req.body;
  const isExists = await teacherModel.findOne({ email: teacher.email });
  if (isExists)
    return res.status(200).send({ message: "Teacher Already Exists.." });
  const newTeacher = new teacherModel({
    name: teacher.name,
    email: teacher.email,
    mobile: teacher.mobile,
    gender: teacher.gender,
  });
  newTeacher
    .save()
    .then((data) => {
      console.log("DATA SAVED : ", data);
      return res.status(200).send({ message: "Teacher Data Saved.." });
    })
    .catch((e) => {
      return res.status(201).send({ message: "Error : ", e });
    });
});

router.get("/", (req, res) => {
  teacherModel
    .find()
    .then((data) => {
      if (data.length > 0) return res.send(data);
      else return res.send({ message: "No Data Found" });
    })
    .catch((e) => {
      return res.send({ message: e });
    });
});

//Delete Student by Id
router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const student = await teacherModel.findById(id);
  console.log(student);
  if (student) {
    teacherModel.deleteOne(student).then(() => {
      return res.send({ message: "Student Deleted" });
    });
  } else {
    return res.send({ message: `Data Not Found For ID: ${id}` });
  }
});

//Get the user
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const student = await teacherModel.findById(id);
  if (student) {
    console.log("rocord found");
    console.log(student);
    return res.send({ message: `Data Found For ID: ${id}` });
  } else {
    console.log("data not found");
    return res.send({ message: `Data Not Found For ID: ${id}` });
  }
});

//UPDATE
// router.post("/update/:id", async (req, res) => {
//   const id = req.params.id;
//   const updatedData = req.body; //get updated data from req body

//   const student = await teacherModel.findOneAndUpdate(
//     { _id: id },
//     updatedData,
//     { new: true }
//   );

//   if (student) {
//     console.log("rocord found");
//     console.log(student);
//     return res.send({ message: `Data Found For ID: ${id}` });
//   } else {
//     console.log("data not found");
//     return res.send({ message: `Data Not Found For ID: ${id}` });
//   }
// });

//UPDATE API with validation..
router.post("/updatev2/:id", async (req, res) => {
  //Get id from the reqst params
  const id = req.params.id;

  //check if the id is valid hexadecimal or not
  var isValid = mongoose.Types.ObjectId.isValid(id);

  if (isValid) {
    //if id is valid then check that id already exist or not
    const teacher = await teacherModel.findById(id);

    if (teacher) {
      const updatedData = req.body; //get updated data from req body

      //and update that data
      const updateTeacher = await teacherModel.findOneAndUpdate(
        { _id: id },
        updatedData,
        { new: true }
      );

      if (updateTeacher) {
        return res.send({ message: `Data Updated For ID: ${id}` });
      } else {
        return res.send({ message: `Data Not Updated For ID: ${id}` });
      }
    } else {
      return res.send({ message: `Data Not Found For ID: ${id}` });
    }
  } else {
    return res.send({ message: `Invalid ID: ${id}` });
  }
});

module.exports = router;
