
const asyncHandler = require("express-async-handler")


const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Controller function to get all courses
const viewAllCourses = asyncHandler(async (req, res) => {
    const courses = await CourseModel.find();
    res.json(courses);
});

module.exports = {
    viewAllCourses,
};