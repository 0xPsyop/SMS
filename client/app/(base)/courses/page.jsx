import Table from '@/app/components/table'
import Navbar from "@/app/components/navbar";

export default function Courses(){

    const headers= [
        "Name", "CourseId", "Instructor Name", "Enrolled Students"
    ]

    const courses =[
        {name:"Manujaya", id:"0001", degree:"SE", email:"blahblah@gmail.com"}
    ]
    return(
       <div className='flex'>
        <Navbar/>
        <Table headers={headers} courses= {courses}/>
       </div>
    )
}