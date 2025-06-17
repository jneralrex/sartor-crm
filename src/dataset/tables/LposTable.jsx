import { Download, Ellipsis, Option, OptionIcon, Plus, Thermometer } from 'lucide-react';
import search from '../../assets/images/search.png';

const allLPOs = [
  {
    id: 'LPO321-05',
    customer: 'Harris Holdings LLC',
    subscription: 'Paid',
    address: 'Ikeja, Lagos',
    status: 'Delivered',
    date: '01, Feb 2023',
    amount: 'N10,412,320',
  },
  {
    id: 'LPO321-05',
    customer: 'Lee Logistics Ltd.',
    subscription: 'In-Progress',
    address: 'Ikeja, Lagos',
    status: 'In Transit',
    date: '01, Feb 2023',
    amount: 'N10,412,320',
  },
  {
    id: 'LPO321-05',
    customer: 'Martinez Media...',
    subscription: 'Partially paid',
    address: 'Ikeja, Lagos',
    status: 'Processing',
    date: '01, Feb 2023',
    amount: 'N10,412,320',
  },
  {
    id: 'LPO321-05',
    customer: 'Taylor & Co. Inc.',
    subscription: 'Cancelled',
    address: 'Ikeja, Lagos',
    status: 'Delivered',
    date: '01, Feb 2023',
    amount: 'N10,412,320',
  },
  {
    id: 'LPO321-05',
    customer: 'Wilson Works LLC',
    subscription: 'Overdue',
    address: 'Ikeja, Lagos',
    status: 'Cancelled',
    date: '01, Feb 2023',
    amount: 'N10,412,320',
  },
];

const LposTable = ({ activeTab }) => {
  const filteredLpos =
    activeTab === 'All Employees'
      ? allLPOs
      : allLPOs.filter((lpo) => lpo.position === activeTab);
  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20 ">
        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <img src={search} alt="" srcset="" />
          <input
            type="text"
            placeholder="Search by ID, name or email"
            className="bg-transparent rounded text-sm outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-primary_white border px-2 py-2 rounded-md text-sm max-w-[148px] md:w-[160px] h-[40px] flex text-center items-center gap-1 md:gap-2 text-[#1A1A1A] public-sans"><span><Plus /></span><span>Create LPO</span></button>
          <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px] text-[12px]' /><span className='text-primary_white text-[12px] font-[sfpro]'>Download csv</span></buttton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr className=''>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">LPO Status</th>
              <th className="px-4 py-2">Date Created</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLpos.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-gray-50 text-start">
                <td className="px-4 py-3 text-[#767676] font-normal text-xs md:text-[14px]">{emp.id}</td>
                <td className="px-4 py-3 flex items-center gap-2 ">
                  <div>
                    <div className="text-[#484848] font-medium text-xs md:text-[14px]">{emp.customer}</div>
                    <div
                      className={`text-xs text-start font-medium py-1 rounded 
                           ${emp.subscription === 'Paid'
                          ? ' text-[#00D743]'
                          : emp.subscription === 'In-Progress'
                            ? ' text-[#FFB400]'
                            : emp.subscription === 'Partially paid'
                              ? ' text-purple-700'
                              : emp.subscription === 'Overdue'
                                ? ' text-purple-700'
                                : emp.subscription === 'Cancelled'
                                  ? ' text-red-500'
                                  : ' text-gray-500'
                        }
      `}
                    >
                      {emp.subscription}
                    </div>                  </div>
                </td>
                <td className="px-4 py-3 text-[#767676] text-xs md:text-[14px] font-normal">{emp.address}</td>
                <td className={`px-4 py-3 text-xs md:text-xs md:text-[14px] 
                 ${emp.status === 'Delivered'
                    ? ' text-[#00D743]'
                    : emp.status === 'In Transit'
                      ? ' text-[#000068]'
                      : emp.status === 'Processing'
                        ? ' text-[#FFB400]'
                        : emp.status === 'Sorted'
                          ? ' text-[#9191FF]'
                          : emp.status === 'Cancelled'
                            ? ' text-[#FF3B30]'
                            : ' text-gray-500'
                  }
      `}>{emp.status}</td>
                <td className="px-4 py-3 text-[#767676] text-xs md:text-[14px] font-normal">{emp.date}</td>
                <td className="px-4 py-3 text-[#767676] text-xs md:text-[14px] font-normal">{emp.amount}</td>
                <td className="px-4 py-3 ">
                  <button className="text-gray-500 hover:text-gray-700"><Ellipsis /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>Show 12 from 1400</span>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 border rounded text-gray-500">1</button>
          <button className="px-2 py-1 border rounded">2</button>
          <button className="px-2 py-1 border rounded">3</button>
          <span>...</span>
          <button className="px-2 py-1 border rounded">440</button>
        </div>
      </div>
    </>
  );
};

export default LposTable;
