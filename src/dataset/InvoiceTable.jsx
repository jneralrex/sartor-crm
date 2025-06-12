import { Download, Ellipsis, Option, OptionIcon, Plus, Thermometer } from 'lucide-react';
import search from '../assets/images/search.png';

const allEmployees = [
    {
        id: 'SMX0221-01',
        name: 'Liam Everhart',
        products: '4',
        status: 'Paid',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
    {
        id: 'SMX0221-02',
        name: 'Elijah Kensington',
        products: '4',
        status: 'Pending',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
    {
        id: 'SMX0221-03',
        name: 'Charlotte Winslow',
        products: '4',
        status: 'Pending',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
    {
        id: 'SMX0221-03',
        name: 'Charlotte Winslow',
        products: '4',
        status: 'Partially Paid',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
    {
        id: 'SMX0221-03',
        name: 'Charlotte Winslow',
        products: '4',
        status: 'Paid',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
    {
        id: 'SMX0221-03',
        name: 'Charlotte Winslow',
        products: '4',
        status: 'Cancelled',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
    {
        id: 'SMX0221-03',
        name: 'Charlotte Winslow',
        products: '4',
        status: 'Partially Paid',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
    {
        id: 'SMX0221-03',
        name: 'Charlotte Winslow',
        products: '4',
        status: 'Cancelled',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
    {
        id: 'SMX0221-03',
        name: 'Charlotte Winslow',
        products: '4',
        status: 'Overdue',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
    {
        id: 'SMX0221-03',
        name: 'Charlotte Winslow',
        products: '4',
        status: 'Pending',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
    {
        id: 'SMX0221-03',
        name: 'Charlotte Winslow',
        products: '4',
        status: 'Pending',
        totalAmount: 'N10,412,320',
        date: '12, Feb 2023',
        totalQty: '1000',
    },
   
];
const InvoiceTable = ({ activeTab }) => {
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
                    <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[12px] font-[sfpro]'>Download csv</span></buttton>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-left text-sm bg-primary_white">
                    <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
                        <tr className=''>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Customer Name</th>
                            <th className="px-4 py-2">Products</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Due Date</th>
                            <th className="px-4 py-2">Total Amount</th>
                            <th className="px-4 py-2">Total Qty</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id} className="border-b hover:bg-gray-50 text-start">
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.id}</td>
                                <td className="px-4 py-3 flex items-center gap-2">

                                    <div>
                                        <div className="text-xs md:text-[14px] font-medium text-[#484848]">{emp.name}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.products}</td>
                                <td className={`px-4 py-3 text-xs md:text-[14px] font-normal ${emp.status === 'Paid'
                                    ? ' text-[#33DF69]'
                                    : emp.status === 'Cancelled'
                                        ? ' text-[#FF6259]'
                                    : emp.status === 'Overdue'
                                        ? ' text-[#000068]'
                                    : emp.status === 'Partially Paid'
                                        ? ' text-[#7474E1]'
                                    : emp.status === 'Pending'
                                        ? ' text-[#FFB400]'
                                        : ' text-gray-500'
                                    }
      `}>{emp.status}</td>

                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.date}</td>
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.totalAmount}</td>
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.totalQty}</td>
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
}

export default InvoiceTable
