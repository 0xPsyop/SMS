const express = require("express");
const { viewAllCourses } = require("../controllers/courseController");


const router = express.Router();

router.route("/all").get(viewAllCourses);

module.exports = router;
