import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import customerIcon from './../assets/images/customer.png'
import leadIcon from './../assets/images/leads.png'
import overViewIcon from './../assets/images/overview.png'
import employeesIcon from './../assets/images/people.png'
import stocksIcon from './../assets/images/stocks.png'
import taskManagerIcon from './../assets/images/taskmanager.png'
import invoicesIcon from './../assets/images/invoice.png'
import labelIcon from './../assets/images/label.png'
import lposIcon from './../assets/images/money.png'
import logo from '../assets/images/logo.png';

const menuItems = [
  { label: 'Overview', path: '/', icon: overViewIcon, isEmoji: false },
  { label: 'Task Manager', path: '/task-manager', icon: taskManagerIcon, isEmoji: false },
  { label: 'Employees', path: '/employees', icon: employeesIcon, isEmoji: false },
  { label: 'LPOs', path: '/lpos', icon: lposIcon, isEmoji: false },
  { label: 'Leads', path: '/leads', icon: leadIcon, isEmoji: false },
  { label: 'Customers', path: '/customers', icon: customerIcon, isEmoji: false },
  { label: 'Invoices', path: '/invoices', icon: invoicesIcon, isEmoji: false },
  { label: 'Covert Label Gen', path: '/label-gen', icon: labelIcon, isEmoji: false },
];

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false); // Auto-close drawer on route change (mobile)
  }, [location.pathname]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative min-h-screen flex">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Hamburger Button (mobile) */}
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
          fixed top-0 left-0 bg-white h-screen z-40 p-6 shadow-md transform transition-transform duration-300 ease-in-out
        w-64 md:w-[30%] lg:w-[20%] xl:w-[20%]
           ${isOpen ? 'translate-x-0' : '-translate-x-full'}
           md:translate-x-0 md:relative md:flex
        }
        `}
        style={{ zIndex: 40 }}
      >
        <div className="h-full flex flex-col w-full">
          {/* Logo and Role */}
          <div className="flex items-center justify-between mb-10">
            <img src={logo} alt="Logo" className="w-auto h-6" />
            <span className="bg-gray-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
              Super-Admin
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto hide-scrollbar w-full md:mt-2">
            <ul className="space-y-4 mt-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 text-sm font-medium px-2 py-1 rounded-md w-full h-[48px] 
                      ${location.pathname === item.path
                        ? 'text-primary_blue bg-primary_grey border-l-4 border-primary_blue font-medium text-[16px]'
                        : 'text-[#484848] hover:bg-primary_grey font-medium text-[16px]'}
                    `}
                  >
                    <span>
                      {item.isEmoji ? (
                        item.icon
                      ) : (
                        <img src={item.icon} alt={`${item.label} icon`} className=" " />
                      )}
                    </span>
                    <span>{item.label}</span>

                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content wrapper (scrollable) */}
      <main className="flex-1 overflow-y-auto p-4 h-screen bg-primary_grey w-full md:w-[80%]">
        <Outlet />
      </main>
    </div>
  );
};

export default Drawer;
