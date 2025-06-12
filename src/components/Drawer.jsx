import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline' // Optional icons
import logo from '../assets/images/logo.png'

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex h-screen relative">
      {/* Hamburger Button for Mobile */}
      <button
        className="absolute top-4 left-4 z-[99] md:hidden p-2 rounded-md bg-white shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-black" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white text-black flex flex-col p-6 z-40 transform transition-transform duration-300 ease-in-out
          w-64 md:w-[30%] lg:w-[20%] xl:w-[20%]
          ${isOpen ? 'translate-x-0'  : '-translate-x-full'}
          md:translate-x-0 md:relative md:flex
        `}
      >
        
        <div className="flex items-center mb-8 justify-evenly">
          <img src={logo} alt="Logo" />
          <div className="font-[sfpro] bg-primary_grey text-primary_blue px-3 rounded-md text-[14px] font-semibold max-w-[103px] text-center">
            Super-Admin
          </div>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
             <Link to="/" className="hover:text-gray-600">Dashboard</Link>
            </li>
             <li className="mb-4">
              <Link to="task-manager" className="hover:text-gray-600">Task Manager</Link>
            </li>
             <li className="mb-4">
              <Link to="employees" className="hover:text-gray-600">Employees</Link>
            </li>
            <li className="mb-4">
              <Link to="lpos" className="hover:text-gray-600">LPOs</Link>
            </li> <li className="mb-4">
              <Link to="leads" className="hover:text-gray-600">Leads</Link>
            </li>
             <li className="mb-4">
              <Link to="customers" className="hover:text-gray-600">Customers</Link>
            </li>
          <li className="mb-4">
              <Link to="invoices" className="hover:text-gray-600">Invoices</Link>
            </li>
             <li className="mb-4">
              <Link to="label-gen" className="hover:text-gray-600">Convert Label Gen</Link>
            </li>
            {/* Add more links here */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-primary_grey overflow-auto w-full md:w-[80%]">
        <Outlet />
      </main>
    </div>
  )
}

export default Drawer
