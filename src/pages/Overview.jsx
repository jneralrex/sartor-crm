import { useState } from 'react'
import CalendarWidget from '../components/CalendarWidget'
import UserActionNav from '../components/UserActionNav'
import { Calendar, ChevronDownIcon, Download } from 'lucide-react'
import customers from '../assets/images/customers.png'
import lead from '../assets/images/lead.png'
import chart from '../assets/images/chart.png'
import stethoscope from '../assets/images/stethoscope.png'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProductTable from '../dataset/ProductTable'
import SalesRepList from '../dataset/SalesRepList'


const Overview = () => {
    const [openCalendar, setOpenCalendar] = useState(false);

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData(159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];



    return (
        <>
            <nav className='outlet-frame '>
                <h1 className='outlet-title'>Overview</h1>
                <div className=''>
                    <UserActionNav />
                </div>
            </nav>

            <div className='w-full flex-row justify-end p-2 items-center gap-2 relative hidden mt-20 md:flex'>
                <div>
                    <button
                        onClick={() => setOpenCalendar(!openCalendar)}
                        className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black"
                    >
                        <div className="flex text-left items-center">
                            <div className='flex gap-1 items-center bg-primary_white h-[40px] w-[156px] justify-center'><Calendar className='text-[#A3A3A3] h-[16.67px]' /><span className='text-[#1A1A1A] text-[14px]'>Show Yearly</span>                         <ChevronDownIcon className="text- h-5 text-[#A3A3A3] " />
                            </div>
                        </div>
                    </button>

                    {openCalendar && (
                        <div className="absolute right-0 mt-2 w-[400px] bg-white p-4 shadow-lg rounded-md">
                            <CalendarWidget />
                        </div>
                    )}
                </div>

                <div className="flex flex-col text-left">
                    <div className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[14px] font-[sfpro]'>Download csv</span></div>
                </div>
            </div>

            <div className='w-full grid md:grid-cols-4 md:px-4 mt-[90px] md:mt-0'>
                <div className='grid-cards'>
                    <span className='grid-cards-icons'><img src={customers} alt="" /></span>
                    <div className='grid-text-cards'>
                        <span className='grid-cards-text-main'>1000</span>
                        <span className='grid-cards-text-sub'>Total Sales</span>
                    </div>
                </div>
                <div className='grid-cards'>
                    <span className='grid-cards-icons'><img src={lead} alt="" /></span>
                    <div className='grid-text-cards'>
                        <span className='grid-cards-text-main'>1000</span>
                        <span className='grid-cards-text-sub'>Total Sales</span>
                    </div>
                </div>
                <div className='grid-cards'>
                    <span className='grid-cards-icons'><img src={chart} alt="" /></span>
                    <div className='grid-text-cards'>
                        <span className='grid-cards-text-main'>N1,000,000</span>
                        <span className='grid-cards-text-sub'>Total Sales</span>
                    </div>
                </div>
                <div className='border-0 grid-cards'>
                    <span className='grid-cards-icons'><img src={chart} alt="" /></span>
                    <div className='grid-text-cards'>
                        <span className='grid-cards-text-main'>N1,000,000</span>
                        <span className='grid-cards-text-sub'>Total Sales</span>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="flex flex-col md:justify-center  items-center lg:items-start lg:flex-row gap-6">
                    <ProductTable />
                    <SalesRepList />
                </div>
            </div>
        </>
    )
}

export default Overview
