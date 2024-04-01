const express = require("express");
const { getAllCourses ,addCourse} = require("../controllers/courseController");


const router = express.Router();

router.route("/all").get(getAllCourses);
router.route("/add").post(addCourse);

module.exports = router;
