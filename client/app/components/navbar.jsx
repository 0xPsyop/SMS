'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Navbar(){

    const pathName = usePathname()
    const logoPath = '.././public/courses.png'

    const courseIcon = '../public/courses.png'
    const studentIcon = '../public/students.png'
    const addIcon = '../public/add.png'
    const logIcon = '../public/history.png'

    const menus = [
        {icon:courseIcon, name: "Courses", route:"/courses" },
        {icon:studentIcon, name: "Students",route:"/students" },
        {icon:addIcon, name: "Add Students",route:"/addStudents" },
        {icon:logIcon, name: "History",route:"/history" },
    ]
    return (
        <>   

        <aside className="fixed w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-blue-900 dark:border-gray-700">
           
            <div className="flex flex-col items-center mt-6 -mx-2">
                <img className="object-cover w-24 h-24 mx-2 rounded-full" src={logoPath} alt="avatar" />
                <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">ABC College</h4>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
            <ul className="space-y-2 font-medium">
                     
                     {menus.map((menu, i)=>(
                        <li>
                        <Link key={i} href={menu.route} className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-500 group ${pathName.includes(menu.route) && " bg-blue-500"}`}>
                           {/* <img src= {menu.icon} className= 'w-5 h-5'/> */}
                            <span className="ms-3">{menu.name}</span>
                        </Link>
                         </li>
                     ))}     
            </ul>
            </div>
        </aside>

        </>
    );
}


