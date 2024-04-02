'use client'

import { useEffect, useState } from 'react';

export default function MiniTable(props) {

    const [courseData, setCourseData] = useState([])
    const [studentData, setStudentData] = useState({})
    const [removeText, setRemoveText] = useState("Remove")
    const [enrollText, setEnrollText] = useState("Enroll")


    useEffect(() => {
        setCourseData(props.courses)
        setStudentData(props.student)
        console.log(props, "props")
    }, [props.courses])

    async function handleRemove(courseId) {
        // Update studentData to remove the course ID from currentCourses and add it to completedCourses
        const updatedStudentData = {
            currentCourses: studentData.currentCourses.filter(id => id !== courseId),
            completedCourses: [...studentData.completedCourses, "courseId"]
        };
    
        try {
            // Send the updated data to the server
            const response = await fetch(`http://localhost:3001/students/update/${props.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedStudentData)
            });
    
            if (response.ok) {
                console.log("Course completed successfully");
                // Redirect to '/students' page after successful update
                // router.push('/students');
                setRemoveText("Removed")

            } else {
                console.log("Student update failed");
            }
        } catch (error) {
            console.error("Error updating student:", error);
        }
    }
    

    async function handleEnroll(courseId) {
        // Update studentData to add the course ID to the currentCourses array
        
        

        const updatedStudentData = {
         currentCourses: [...studentData.currentCourses,"courseId"],
        };
    
        try {
            // Send the updated data to the server
            const response = await fetch(`http://localhost:3001/students/update/${props.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedStudentData)
            });
    
            if (response.ok) {
                console.log("Course enrolled successfully");
                // Redirect to '/students' page after successful update
                // router.push('/students');
                setEnrollText("Enrolled")
            } else {
                console.log("Course enroll failed");
            }
        } catch (error) {
            console.error("Error enrolling course:", error);
        }
    }
    

    return(
      
        <div className="-my-2 py-2 mt-8 pr-10 lg:px-8">
        <h2 className=""> {props.title} </h2>
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
                                {courseData?.map((course, i)=>( 
                              
                                <tr key={i}>  
                                   
                                    <td className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5"> {course.id}</td>
                                   
                                    <td className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5">{course.name}</td>
                                    
                                    {props.removeBtn  && (
                                        <td className="px-6 py-4 whitespace-no-wrap text-right  text-sm leading-5">
                                        <button onClick={(e) =>{handleRemove(course.id)}}className={`px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none${removeText== "removed" && "text-white bg-blue-700" }`}>{removeText}</button>
                                        </td>

                                    ) }
                                    

                                    {props.enrollBtn && (
                                         <td className="px-6 py-4 whitespace-no-wrap text-right  text-sm leading-5">
                                         <button onClick={(e) =>{handleEnroll(course.id)}}className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">{enrollText}</button>
                                        </td>

                                    )}

                                   
                                 
                                </tr>
                             
                                ))}
 
                        </tbody>
                    </table>
                </div>
        </div>
    )
}