
const asyncHandler = require("express-async-handler")


const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, degree, phone, courses, dob } = req.body;

    // Check if email already exists
    const existingStudent = await prisma.student.findUnique({
      where: {
        email: email,
      },
    });

    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new student
    const newStudent = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        degree,
        phone,
        courses,
        dob,
      },
    });

    console.log("Student added successfully") 
    return res.status(201).json({ message: 'Student created successfully', student: newStudent });
      
  } catch (error) {
    console.error('Error adding student:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller function to get all students
const getAllStudents = asyncHandler(async (req, res) => {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
    console.log("All students fetched")
  })


  // Controller function to get a single student by ID
const getStudentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });
  
    if (!student) {
      res.status(404).json({ message: "Student not found" });
    } else {
      res.status(200).json(student);
      console.log("Student found by ID")
    }
  });

  // Controller function to delete a student by ID
const deleteStudentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    // Check if the student with the provided ID exists
    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });
  
    // If the student doesn't exist, return a 404 error
    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
  
    try {
      // Delete the student from the database
      await prisma.student.delete({
        where: { id },
      });
  
      // Respond with a success message
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting student:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  //Controller function to update a student's details
  const updateStudentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, degree, phone, courses, dob } = req.body;
  
    // Check if the student with the provided ID exists
    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });
  
    // If the student doesn't exist, return a 404 error
    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
  
    try {
      // Update the student's details in the database
      const updatedStudent = await prisma.student.update({
        where: { id },
        data: {
          firstName,
          lastName,
          email,
          degree,
          phone,
          courses,
          dob,
        },
      });
  
      // Respond with the updated student data
      res.status(200).json({ message: "Student details updated successfully", updatedStudent });
    } catch (error) {
      // Handle any errors that occur during the update process
      console.error("Error updating student:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = { addStudent, getAllStudents,getStudentById, deleteStudentById, updateStudentById };
