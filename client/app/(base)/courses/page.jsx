'use client'

import Table from '@/app/components/table'
import Navbar from "@/app/components/navbar";
import { useEffect,useState } from 'react';

export default function Courses(){

    const[courseData, setCourseData] = useState('null')


    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const courses = await fetch("http://localhost:3001/courses/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const response = await courses.json();
                setCourseData(response); // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        }
      fetchCourseData()
    }, []);




    const headers= [
        "Name", "CourseId", "Instructor Name", "Enrolled Students"
    ]

 
    return(
       <div className='flex'>
        <Navbar/>
        <Table headers={headers} courses= {courseData}/>
       </div>
    )
}