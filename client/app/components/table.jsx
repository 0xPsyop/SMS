'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Table(props) {

    const [studentData, setStudentData] = useState([])
    const router = useRouter()

    useEffect(() => {
        setStudentData(props.students)
    }, [props.students])


    async function handleDelete(index, studentId) {
        try {
            // Send DELETE request to the server
            const response = await fetch(`http://localhost:3001/students/delete/${studentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                // You may pass additional data in the body if required
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
    
            // If the request is successful, update the state locally
            const updatedStudentData = studentData.filter((_, i) => i !== index);
            setStudentData(updatedStudentData);

            // Handle success if needed
        } catch (error) {
            console.error('Error deleting student:', error);
            // Handle error
        }
    }
    

    function handleUpdate(id){
        // console.log(id)
        router.push(`updateStudent/${id}`)
    }

    // console.log(props, props.headers)
    return (
        <>
            <div className="-my-2 py-2 lg:ml-64 pr-10 lg:px-8">
                <div className="align-middle  inline-block w-full py-4 overflow-hidden bg-white px-12">
                    <div className="flex justify-between">
                        <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                            <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                                <div className="flex">
                                    <span className="flex items-center leading-normal bg-transparent rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                                        <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                                <input type="text" className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin" placeholder="Search"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="align-middle inline-block min-w-full overflow-hidden bg-white shadow-dashboard px-8 pt-3">
                    <table className="min-w-full">
                        <thead>
                            <tr> 
                                {props.headers.map(( header, i)=>(
                                    <th key={i} className="px-6 py-3  text-left text-sm leading-4 text-blue-500 tracking-wider">{header}</th>
                                ))}
                                
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                           
                                {/* Table rows */}
                                {studentData?.map((student, i)=>( 
                              
                                <tr key={i}>  
                                   
                                    {console.log(student, "student")}
                                    <td className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5">{<Link href={`/student/${student.id}`}> {student.firstName +" "+ student.lastName} </Link>}</td>
                                   
                                    <td className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5">{student.id}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5">{student.email}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5">{student.degree}</td>
                     
                                    <td className="px-6 py-4 whitespace-no-wrap text-right  text-sm leading-5">
                                        <button onClick={(e) =>{handleUpdate(student.id)}}className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Update</button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right  text-sm leading-5">
                                        <button onClick={(e) => {handleDelete(i, student.id)}} className="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none">Remove</button>
                                    </td>
                                </tr>
                             
                                ))} 

                                {props.courses?.map((course, i)=>(   
                                <tr key={i}>  
                               
                                    <td className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5">{course.name}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5">{course.id}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5">{course.instructorName}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5">{course.count}</td>
                     
                    
                                </tr>
                                ))} 
 
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
