import { Download, Ellipsis, Option, OptionIcon, Plus, Thermometer } from 'lucide-react';
import search from '../assets/images/search.png';

const allEmployees = [
  {
    id: 'SMX0221-01',
    name: 'Liam Everhart',
    email: 'liam@example.com',
    source: 'Online',
    status: 'New',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-02',
    name: 'Elijah Kensington',
    email: 'elijah@admin.com',
    source: 'Online',
    status: 'Contacted',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-03',
    name: 'Charlotte Winslow',
    email: 'charlotte@rep.com',
    source: 'Online',
    status: 'Order Fulfilled',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-03',
    name: 'Charlotte Winslow',
    email: 'charlotte@rep.com',
    source: 'Online',
    status: 'Follow up',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-03',
    name: 'Charlotte Winslow',
    email: 'charlotte@rep.com',
    source: 'Online',
    status: 'Qualified',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-03',
    name: 'Charlotte Winslow',
    email: 'charlotte@rep.com',
    source: 'Online',
    status: 'Interested',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-03',
    name: 'Charlotte Winslow',
    email: 'charlotte@rep.com',
    source: 'Online',
    status: 'Hold',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-03',
    name: 'Charlotte Winslow',
    email: 'charlotte@rep.com',
    source: 'Manager',
    status: 'In-Negotiation',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-03',
    name: 'Charlotte Winslow',
    email: 'charlotte@rep.com',
    source: 'Sales Rep',
    status: 'LPO Generated',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-03',
    name: 'Charlotte Winslow',
    email: 'charlotte@rep.com',
    source: 'Online',
    status: 'Closed Won',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-03',
    name: 'Charlotte Winslow',
    email: 'charlotte@rep.com',
    source: 'Manager',
    status: 'Closed Lost',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
  {
    id: 'SMX0221-03',
    name: 'Charlotte Winslow',
    email: 'charlotte@rep.com',
    source: 'Sales Rep',
    status: 'Payment Confirmed',
    date: '12, Feb 2023',
    phone: '(847) 785-2310',
  },
];
const LeadsTable = ({ activeTab }) => {
  const filteredEmployees =
    activeTab === 'All Employees'
      ? allEmployees
      : allEmployees.filter((emp) => emp.position === activeTab);
  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <img src={search} alt="" srcset="" />
          <input
            type="text"
            placeholder="Search by ID, name or email"
            className="bg-transparent rounded text-sm outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-primary_white border px-2 py-2 rounded-md text-sm max-w-[148px] md:w-[160px] h-[40px] flex text-center items-center gap-1 md:gap-2 text-[#1A1A1A] public-sans"><span><Plus /></span><span>Add Leads</span></button>
          <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[14px] font-[sfpro]'>Download csv</span></buttton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr className=''>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date Added</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-gray-50 text-start">
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.id}</td>
                <td className="px-4 py-3 flex items-center gap-2">

                  <div>
                    <div className="font-medium text-xs md:text-[14px] text-[#484848]">{emp.name}</div>
                    <div className="text-xs text-[#484848]">{emp.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.source}</td>
                <td className={`px-4 py-3  text-xs md:text-[14px] font-normal ${emp.status === 'New'
                  ? ' text-[#000068]'
                  : emp.status === 'Contacted'
                    ? ' text-[#FFB400]'
                    : emp.status === 'Order Fulfilled'
                      ? ' text-[#FF7105]'
                      : emp.status === 'Closed Lost'
                        ? ' text-[#FF3B30]'
                        : emp.status === 'Qualified'
                          ? ' text-[#6666D2]'
                          : emp.status === 'Interested'
                            ? ' text-[#768B00]'
                            : emp.status === 'Hold'
                              ? ' text-[#FF3B30]'
                              : emp.status === 'In-Negotiation'
                                ? ' text-[#A97B0E]'
                                : emp.status === 'LPO Generated'
                                  ? ' text-[#1A1A1A]'
                                  : emp.status === 'Closed Won'
                                    ? ' text-[#00D743]'
                                    : emp.status === 'Payment Confirmed'
                                      ? ' text-[#D300D7]'
                                      : emp.status === 'Follow up'
                                        ? ' text-[#12D1E2]'
                                        : ' text-gray-500'
                  }
      `}>{emp.status}</td>

                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.date}</td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.phone}</td>
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


export default LeadsTable
