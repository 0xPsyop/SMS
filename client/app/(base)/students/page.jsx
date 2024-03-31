'use client'

import Table from '@/app/components/table'
import Navbar from "@/app/components/navbar";
import { useEffect,useState } from 'react';

export default function Students(){

    const headers= [
        "Name", "Student Id", "Email", "Degree"
    ]


    const[studentData, setStudentData] = useState('null')


    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const students = await fetch("", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const response = await students.json();
                setStudentData(response); // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        }
      fetchStudentData()
    }, []);


    const students =[
        {name:"Manujaya", id:"0001", degree:"SE", email:"blahblah@gmail.com"}
    ]
    return(
        <div className='flex'>
        <Navbar/>
        <Table headers={headers} students= {students}/>
       </div>
    )
}