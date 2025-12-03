import { useState, useEffect } from 'react';
import instance from '../utils/axiosInstance';

import CalendarWidget from '../components/CalendarWidget';
import UserActionNav from '../components/UserActionNav';
import { Calendar, ChevronDownIcon, Download } from 'lucide-react';

import customers from '../assets/images/customers.png';
import lead from '../assets/images/lead.png';
import boxx from '../assets/images/boxx.png';
import chart from '../assets/images/chart.png';
import invoice from '../assets/images/invoice.png';
import comm from '../assets/images/comm.png';
import task from '../assets/images/task.png';


import TotalCustomersChart from '../dataset/charts/TotalCustomersChart';
import TotalRevenueChart from '../dataset/charts/TotalRevenueChart';
import TopSalesRegions from '../dataset/charts/TopSalesRegion';
import { usePasswordChanged, useRole } from '../store/authStore';
import ChangePasswordModal from './auth/modal/ChangePasswordModal';
import TopProduct from '../dataset/tables/TopProduct';

const Overview = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = useRole();

  const changePasswordCheck = usePasswordChanged();

  const isSuperAdmin = role === 'Super-Admin';
  const isSalesRep = role === 'Sales Rep';
  const isInventoryManager = role === 'Inventory Manager';
  const isMerchandiser = role === 'Merchandiser';
  const isManager = role === 'Manager'

  useEffect(() => {
    const fetchDashboard = async () => {

      console.log("checking", changePasswordCheck)
      try {
        const response = await instance.get('dashboard');
        console.log(response)
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  if (!dashboardData) {
    return <div className="p-6 text-center text-red-500">Failed to load dashboard data.</div>;
  }

  return (
    <>
      <nav className='outlet-frame'>
        <h1 className='outlet-title'>Over view</h1>
        <div>
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
              <div className='flex gap-1 items-center bg-primary_white h-[40px] w-[156px] justify-center'>
                <Calendar className='text-[#A3A3A3] h-[16.67px]' />
                <span className='text-[#1A1A1A] public-sans text-[14px]'>Show Yearly</span>
                <ChevronDownIcon className="text-[#A3A3A3] h-5" />
              </div>
            </div>
          </button>

          {openCalendar && (
            <div className="absolute right-0 mt-2 w-[400px] bg-primary_white p-4 shadow-lg rounded-md">
              <CalendarWidget />
            </div>
          )}
        </div>

        <div className="flex flex-col text-left">
          <button className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'>
            <Download className='text-primary_white h-[16.67px]' />
            <span className='text-primary_white text-[12px] font-[sfpro]'>Download csv</span>
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className='w-full grid md:grid-flow-col md:px-4 mt-[90px] md:mt-0'>
        {(isSuperAdmin || isManager) && (
          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={customers} alt="Customers" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>{dashboardData?.cards?.totalCustomers}</span>
              <span className='grid-cards-text-sub'>Customers</span>
            </div>
          </div>
        )}

        {(isSuperAdmin || isInventoryManager || isManager) && (

          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={lead} alt="LPOs" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>{dashboardData?.cards?.totalLpos}</span>
              <span className='grid-cards-text-sub'>Total LPOs</span>
            </div>
          </div>
        )}

        {(isMerchandiser) && (

          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={lead} alt="LPOs" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>{dashboardData?.cards?.totalProducts}</span>
              <span className='grid-cards-text-sub'>Your Products</span>
            </div>
          </div>
        )}

        {(isSuperAdmin || isManager) && (
          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={chart} alt="Sales" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>₦{dashboardData?.cards?.totalSales.toLocaleString()}</span>
              <span className='grid-cards-text-sub'>Total Sales</span>
            </div>
          </div>
        )}

        {(isSuperAdmin || isManager) && (
          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={chart} alt="Revenue" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>₦{dashboardData?.cards?.totalSales.toLocaleString()}</span>
              <span className='grid-cards-text-sub'>Total Revenue</span>
            </div>
          </div>
        )}

        {(isSalesRep || isMerchandiser) && (
          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={task} alt="Revenue" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>{dashboardData?.cards?.totalTask}</span>
              <span className='grid-cards-text-sub'>Your Task</span>
            </div>
          </div>
        )}

        {(isInventoryManager) && (
          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={task} alt="Revenue" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>{dashboardData?.cards?.totalTask}</span>
              <span className='grid-cards-text-sub'>Task</span>
            </div>
          </div>
        )}
        {(isInventoryManager) && (
          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={invoice} alt="Revenue" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>{dashboardData?.cards?.totalInvoice}</span>
              <span className='grid-cards-text-sub'>Invoices</span>
            </div>
          </div>
        )}
        {(isInventoryManager) && (
          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={boxx} alt="Revenue" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>{dashboardData?.cards?.totalStocks}</span>
              <span className='grid-cards-text-sub'>Stocks</span>
            </div>
          </div>
        )}
        {isSalesRep && (
          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={chart} alt="Revenue" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>₦{dashboardData?.cards?.totalSales.toLocaleString()}</span>
              <span className='grid-cards-text-sub'>Your Sales</span>
            </div>
          </div>
        )}
        {isSalesRep && (
          <div className='grid-cards'>
            <span className='grid-cards-icons'><img src={comm} alt="Revenue" /></span>
            <div className='grid-text-cards'>
              <span className='grid-cards-text-main'>₦{dashboardData?.cards?.totalCommission}</span>
              <span className='grid-cards-text-sub'>Your Commissions</span>
            </div>
          </div>
        )}
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mt-10">
        {(!isMerchandiser) && (
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h2 className="font-semibold text-lg mb-2 text-[#1A1C21]">Total Customers</h2>
            <TotalCustomersChart monthlyCounts={dashboardData?.customerChart?.monthlyCounts} />
          </div>)}


        {(!isMerchandiser) && (

          <div className="bg-white p-4 rounded-md shadow-sm">
            <h2 className="font-semibold text-lg mb-2 text-[#1A1C21]">Top Sales Regions</h2>
            <TopSalesRegions regions={dashboardData?.topRegions} />
          </div>)}


        {(!isMerchandiser) && (
          <div className="bg-white p-4 rounded-md shadow-sm md:col-span-2">
            <div className='flex items-center justify-between'>
              <h2 className="font-semibold text-lg mb-2 text-[#1A1C21]">Total Revenue</h2>
              <div className='flex gap-2'>
                <button className='w-[74px] h-[28px] rounded-md text-[12px]'>Sales</button>
                <button className='w-[74px] h-[28px] bg-primary_blue rounded-md text-[12px] text-primary_white'>Revenue</button>
              </div>
            </div>
            <TotalRevenueChart monthlyRevenue={dashboardData?.revenueChart?.monthlyRevenue} />
          </div>)}

        {(isMerchandiser) && (<div className="bg-white p-4 rounded-md shadow-sm md:col-span-2">
          <div className='flex items-center justify-between'>
            <h2 className="font-semibold text-lg mb-2 text-[#1A1C21]">Total Product</h2>
          </div>
          <TopProduct />
        </div>)}
      </div>

      {/* Tables */}


      {!changePasswordCheck && (
        <ChangePasswordModal
          onSuccess={() => {
            // Optionally update store or refresh
          }}
          onCancel={() => {
            console.log("User cancelled password update.");
          }}
        />
      )}

    </>
  );
};

export default Overview;
