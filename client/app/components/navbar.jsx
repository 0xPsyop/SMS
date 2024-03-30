'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Navbar(){

    const pathName = usePathname()

    const courseIcon = "";

    const menus = [
        {icon:courseIcon, name: "Courses", route:"/courses" },
        {icon:courseIcon, name: "Students",route:"/students" },
        {icon:courseIcon, name: "Add Students",route:"/add" },
        {icon:courseIcon, name: "History",route:"/history" },
        {icon:courseIcon, name: "Change Admins",route:"/access" },
    ]
    return (
        <>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-blue-900">
                    <ul className="space-y-2 font-medium">
                     
                     {menus.map((menu, i)=>(
                        <li>
                        <Link key={i} href={menu.route} className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-blue-500 group ${pathName.includes(menu.route) && " bg-blue-500"}`}>
                            <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                               {menu.icon}
                            </svg>
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


