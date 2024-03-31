'use client'

import Navbar from "@/app/components/navbar"
import { useRouter } from "next/navigation"
import { useEffect,useState } from 'react';


export default function UpdateStudent({ params }){


    const[studentData, setStudentData] = useState('null')


    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const student = await fetch("", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const response = await student.json();
                setStudentData(response); // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        }
      fetchStudentData()
    }, []);


    const router = useRouter()

    const[firstName, setFirstName]= useState(studentData.firstName)
    const[lastName, setLastName] = useState(studentData.lastName)
    const[email, setEmail] =useState(studentData.email)
    const[address, setAddress]= useState(studentData.address)
    const[phone, setPhone] = useState(studentData.phone)
    const[degree,setDegree] = useState(studentData.degree)
    const[dob,setDob] = useState(studentData.dob)

    async function handleSubmit(e){
        e.preventDefault()

        const studentData ={
            firstName:firstName,
            lastName:lastName,
            email:email,
            address:address,
            phone:phone,
            degree:degree,
            dob:dob
        }

        console.log(studentData, "Student Data object")


         // Send the data to the server
    const response = await fetch("", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      })

      if (response.ok) {
        console.log("Student updated successfully")
        router.push('/students')
        
      } else {
        console.log("Student update failed")
      }
    }


    return(  

        <div className="flex">

           <Navbar/> 

           <div className="min-h-screen p-6 bg-white ml-64 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
            <div>
    
            <div className="bg-white p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please change only the relevant fields.</p>
                </div>

              
                <form className="lg:col-span-2" onSubmit={handleSubmit}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                        <label htmlFor="full_name">First Name</label>
                        <input  value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    </div>
                    <div className="md:col-span-5">
                        <label htmlFor="full_name">Last  Name</label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                    </div>

                    <div className="md:col-span-5">
                        <label htmlFor="email">Email Address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="email@domain.com" />
                    </div>

                    <div className="md:col-span-3">
                        <label htmlFor="address">Address / Street</label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)}type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="city">Phone number</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                    </div>
                    
                    <div className="md:col-span-3">
                    <label htmlFor="dob">Date of Birth</label>
                    <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" name="dob" id="dob" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="degree_programme">Degree Programme</label>
                    <select value={degree} onChange={(e) => setDegree(e.target.value)} name="degree_programme" id="degree_programme" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                      <option value="">Select Degree Programme</option>
                      <option value="BSc Computer Science">BSc Computer Science</option>
                      <option value="BEng Electrical Engineering">BEng Electrical Engineering</option>
                      <option value="BA English Literature">BA English Literature</option>
                    </select>
                  </div>
                   

                    <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded" onClick={handleSubmit}>Update Student</button>
                        </div>
                    </div>

                            </div>
                </form>
              
                        </div>
                    </div>
                    </div>   
                </div>
            </div>
        </div>
          );
    
}