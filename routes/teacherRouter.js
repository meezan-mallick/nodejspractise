const express = require("express");
const teacherModel = require("../models/teacherModel");
let router = express.Router();

router.post("/", async (req, res) => {
  const teacher = req.body;
  const isExists = await teacherModel.findOne({email: teacher.email}); 
  if(isExists) return res.status(200).send({ message: "Teacher Already Exists.." });
  const newTeacher = new teacherModel({
    name: teacher.name,
    email: teacher.email,
    mobile: teacher.mobile,
    gender: teacher.gender,
  });
  newTeacher.save()
    .then((data) => {
      console.log("DATA SAVED : ", data);
      return res.status(200).send({ message: "Teacher Data Saved.." });
    })
    .catch((e) => {
      return res.status(201).send({ message: "Error : ", e });
    });
});

router.get("/", (req, res) => {
  teacherModel.find()
      .then((data) => {
          if (data.length > 0) return res.send(data);
          else return res.send({ message: 'No Data Found' });
      })
      .catch((e) => {
          return res.send({ message: e });
      });
});

//Delete Student by Id
router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const student = await teacherModel.findById(id);
  if (student) {
      teacherModel.deleteOne(student)
          .then(() => {
              return res.send({ message: "Student Deleted" });
          });
  } else {
      return res.send({ message: `Data Not Found For ID: ${id}` })
  }

});

module.exports = router;
