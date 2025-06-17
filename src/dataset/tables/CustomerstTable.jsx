import { Download, Ellipsis, Option, OptionIcon, Plus, Thermometer } from 'lucide-react';
import search from '../../assets/images/search.png';


const allEmployees = [
    {
        id: 'CUS22-01',
        name: 'Liam Everhart',
        email: 'liam@example.com',
        location: 'Ikeja, Lagos',
        status: 'Active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Elijah Kensington',
        email: 'elijah@admin.com',
        location: 'Ikeja, Lagos',
        status: 'Active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Charlotte Winslow',
        email: 'charlotte@rep.com',
        location: 'Ikeja, Lagos',
        status: 'Active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Charlotte Winslow',
        email: 'charlotte@rep.com',
        location: 'Ikeja, Lagos',
        status: 'In-active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Charlotte Winslow',
        email: 'charlotte@rep.com',
        location: 'Ikeja, Lagos',
        status: 'Active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Charlotte Winslow',
        email: 'charlotte@rep.com',
        location: 'Ikeja, Lagos',
        status: 'Active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Charlotte Winslow',
        email: 'charlotte@rep.com',
        location: 'Ikeja, Lagos',
        status: 'In-active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Charlotte Winslow',
        email: 'charlotte@rep.com',
        location: 'Ikeja, Lagos',
        status: 'Active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Charlotte Winslow',
        email: 'charlotte@rep.com',
        location: 'Ikeja, Lagos',
        status: 'Active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Charlotte Winslow',
        email: 'charlotte@rep.com',
        location: 'Ikeja, Lagos',
        status: 'Active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Charlotte Winslow',
        email: 'charlotte@rep.com',
        location: 'Ikeja, Lagos',
        status: 'In-active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
    {
        id: 'CUS22-01',
        name: 'Charlotte Winslow',
        email: 'charlotte@rep.com',
        location: 'Ikeja, Lagos',
        status: 'In-active',
        date: '12, Feb 2023',
        phone: '(847) 785-2310',
    },
];

const CustomerstTable = ({ activeTab }) => {
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
                    <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[12px]'>Download csv</span></buttton>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-left text-sm bg-primary_white">
                    <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
                        <tr className=''>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Location</th>
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
                                        <div className="font-medium text-[#484848] text-xs md:text-[14px]">{emp.name}</div>
                                        <div className="text-xs font-medium text-[#A3A3A3]">{emp.email}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-3  font-normal text-[#484848] text-xs md:text-[14px]">{emp.location}</td>
                                <td className={`px-4 py-3  font-normal text-xs md:text-[14px] ${emp.status === 'Active'
                                    ? ' text-[#00D743]'
                                    : emp.status === 'In-active'
                                        ? ' text-[#FF3B30]'
                                        : ' text-gray-500'
                                    }
      `}>{emp.status}</td>

                                <td className="px-4 py-3 font-normal text-[#484848] text-xs md:text-[14px]">{emp.date}</td>
                                <td className="px-4 py-3 font-normal text-[#484848] text-xs md:text-[14px]">{emp.phone}</td>
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

export default CustomerstTable
