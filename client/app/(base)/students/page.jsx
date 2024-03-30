import Table from '@/app/components/table'
import Navbar from "@/app/components/navbar";

export default function Students(){

    const headers= [
        "Name", "Student Id", "Email", "Degree"
    ]

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