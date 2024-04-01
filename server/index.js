// IMPORTS AND OTHER REQUIREMENTS
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { PrismaClient } = require("@prisma/client");



//necessary routes

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");


// APP INITIALIZATION

// instantiating an ExpressJS app
const app = express();

const prisma = new PrismaClient();

// set allowed origins for CORS
const allowedOrigins = ["http://localhost:3000"];

// middleware for the app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);




// console.log(`BACKEND SERVER STARTED IN ${config.get("Name")} ENVIRONMENT`);

const port = process.env.PORT;


app.listen(port, () => console.log(`Listening to Port ${port}`));



module.exports = {app, prisma};