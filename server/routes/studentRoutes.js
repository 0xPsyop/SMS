const express = require("express");

const { addStudent, getAllStudents, getStudentById, updateStudentById, deleteStudentById } = require("../controllers/studentController")


const router = express.Router();


router.route("/add").post(addStudent);
router.route("/all").get(getAllStudents);
router.route("/:id").get(getStudentById);
router.route("/update/:id").put(updateStudentById);
router.route("/delete/:id").delete(deleteStudentById);


module.exports = router;
