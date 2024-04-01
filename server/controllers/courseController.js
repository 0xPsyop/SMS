
const asyncHandler = require("express-async-handler")


const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Controller function to get all courses
const getAllCourses = async (req, res) => {
    try {
        // Fetch all courses from the database
        const courses = await prisma.course.findMany();

        // Return courses as a response
        res.status(200).json({
            success: true,
            data: courses,
            message: 'All courses retrieved successfully.'
        });
    } catch (error) {
        // Handle error
        console.error('Error fetching courses:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve courses. Please try again later.'
        });
    }
};

const addCourse = async (req, res) => {
    const { name, instructorName, degree } = req.body;

    try {
        // Create new course in the database
        const newCourse = await prisma.course.create({
            data: {
                
                name,
                instructorName,
                degree
            }
        });

        // Send success response with the newly created course
        res.status(201).json({
            success: true,
            data: newCourse,
            message: 'Course added successfully.'
        });
    } catch (error) {
        // Send error response if something went wrong
        console.error('Error adding course:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add course. Please try again later.'
        });
    }
};

module.exports = {
    getAllCourses,
    addCourse
};