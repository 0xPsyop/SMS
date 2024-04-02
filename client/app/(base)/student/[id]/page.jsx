'use client'

import MiniTable from "@/app/components/minitable"
import Navbar from "@/app/components/navbar"
import { useEffect,useState } from 'react'


export default function student({ params }) {


    const[studentData, setStudentData] = useState({})
    const[courseData, setCourseData] = useState([])
    const[availableCourses, setAvailableCourses] = useState([])
    const[currentCourses, setCurrentCourses] = useState([])
    const[completedCourses, setCompletedCourses] = useState([])


    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const student = await fetch(`http://localhost:3001/students/${params.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const response = await student.json();
                console.log(response, "recieved ")
                setStudentData(response); // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        }
      

      const fetchCourseData = async () => {
        try {
            const courses = await fetch("http://localhost:3001/courses/all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const response = await courses.json();
            setCourseData(response.data); // Update the state with the fetched data
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    }

   fetchStudentData()
   fetchCourseData()

    }, []);


    // Helper function to get available courses by removing completed and current courses
    const getAvailableCourses = () => {
        // Ensure that both completedCourses and currentCourses are defined
        if (!studentData.completedCourses || !studentData.currentCourses) {
            return [];
        }
    
        // Extracting course IDs from completedCourses and currentCourses
        const completedCourseIds = studentData.completedCourses;
        const currentCourseIds = studentData.currentCourses;
    
        // Filtering courseData to get available courses
        return courseData.filter(course => {
            // Check if the course ID is not present in either completedCourses or currentCourses
            return !completedCourseIds.includes(course.id) && !currentCourseIds.includes(course.id);
        });
    };
    

    const mapCourseIndicesToObjects = (courseIndices, coursesData) => {
       
        if (!studentData.completedCourses || !studentData.currentCourses) {
            return [];
        }
        return courseIndices.map(index => {
            return coursesData.find(course => course.id == index);
        }).filter(Boolean);
    };
    

     useEffect(() => {
            console.log(studentData, "Student Data object")
            console.log(courseData, "Course Data object")


           let availableCoursesTemp = getAvailableCourses();
           let currentCoursesTemp = mapCourseIndicesToObjects(studentData.currentCourses, courseData);
           let completedCoursesTemp = mapCourseIndicesToObjects(studentData.completedCourses, courseData);

           setAvailableCourses(availableCoursesTemp);
           setCurrentCourses(currentCoursesTemp);
            setCompletedCourses(completedCoursesTemp);


           console.log(availableCourses, currentCourses, completedCourses, "Available, Current, Completed")
        }, [studentData, courseData])


    const headers= [
        "Course Id", "Name"
     ]

     const titles =[
        "Completed Courses",
        "Current Courses",
        "Upcoming Courses"
     ]

    return(
        <div className='flex'>
        <Navbar/>
       <div className=" lg:ml-64">
       <MiniTable headers={headers} title={titles[0]} courses={completedCourses}  />
      </div> 
        <MiniTable headers={headers} title = {titles[1]} courses={currentCourses} removeBtn= {true} id={params.id} student={studentData}/>
        <MiniTable headers={headers} title = {titles[2]} courses= {availableCourses} enrollBtn={true} id={params.id} student={studentData}/>
       </div>
    )
}