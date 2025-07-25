import { Download, Ellipsis, } from 'lucide-react';
import search from '../../assets/images/search.png';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import instance from '../../utils/axiosInstance';
import { Menu } from '@headlessui/react';
import CustomerDetails from '../../components/modals/customer/CustomerDetails';

const CustomerstTable = ({ onClose }) => {
    const { token } = useAuth();
    const [getAllCustomer, setGetAllCustomer] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isCustomerDetailsModalOpen, setCustomerDetailsModalOpen] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const perPage = 100;

    const allCustomer = async () => {
        try {
            const res = await instance.get(`customers?limit=${perPage}`);
            console.log(res.data);

            // Accessing nested response correctly
            const customerArray = res.data?.data?.data || [];
            const total = res.data?.data?.pagination?.totalPages || 1;

            setGetAllCustomer(customerArray);
            setTotalPages(total);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredCustomers = getAllCustomer;


    useEffect(() => {
        allCustomer(currentPage);
    }, [currentPage, token]);

    const handleViewCustomerDetailModalToggle = (id) => {
        setSelectedCustomerId(id);
        setCustomerDetailsModalOpen(true);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
                <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
                    <img src={search} alt="search" />
                    <input
                        type="text"
                        placeholder="Search by ID, name or email"
                        className="bg-transparent rounded text-sm outline-none"
                    />
                </div>
                <div className="flex gap-2">
                    <button className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'>
                        <Download className='text-primary_white h-[16.67px]' />
                        <span className='text-primary_white text-[12px]'>Download CSV</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-left text-sm bg-primary_white">
                    <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
                        <tr>
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
                        {filteredCustomers.map((emp, index) => (
                            <tr key={emp._id} className="border-b hover:bg-gray-50 text-start">
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                                    {(currentPage - 1) * perPage + index + 1}
                                </td>

                                <td className="px-4 py-3 flex items-center gap-2">
                                    <div>
                                        <div className="font-medium text-[#484848] text-xs md:text-[14px]">{emp.lead?.name}</div>
                                        <div className="text-xs font-medium text-[#A3A3A3]">{emp.lead?.email}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-normal text-[#484848] text-xs md:text-[14px]">
                                    {emp.lead?.state}
                                </td>
                                <td className={`px-4 py-3 font-normal text-xs md:text-[14px] ${emp.status === 'Active'
                                    ? 'text-[#00D743]'
                                    : emp.status === 'In-active'
                                        ? 'text-[#FF3B30]'
                                        : 'text-gray-500'
                                    }`}>
                                    {emp.status}
                                </td>
                                <td className="px-4 py-3 font-normal text-[#484848] text-xs md:text-[14px]">
                                    {new Date(emp.creationDateTime).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 font-normal text-[#484848] text-xs md:text-[14px]">
                                    {emp.lead?.phone}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="relative">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
                                                <Ellipsis />
                                            </Menu.Button>
                                            <Menu.Items className="absolute p-2 right-0 z-[99] w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                                                onClick={() => handleViewCustomerDetailModalToggle(emp._id)}
                                                            >
                                                                View Details
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                                <div>

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                                                // onClick={() => {
                                                                //     setProductToEdit(prod);
                                                                //     setIsEditProductModalOpen(true);
                                                                // }}
                                                            >
                                                                Edit
                                                            </button>
                                                        )}
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-red-200 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-red-500`}
                                                                // onClick={() => {
                                                                //     setProductToDelete(prod._id);
                                                                //     setIsConfirmOpen(true);
                                                                // }}
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </Menu.Item>

                                                </div>
                                            </Menu.Items>
                                        </Menu>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>Showing {getAllCustomer.length} of {perPage * totalPages}</span>
                <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={`px-2 py-1 border rounded ${currentPage === i + 1 ? 'bg-primary_blue text-white' : ''}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {isCustomerDetailsModalOpen && (
                <CustomerDetails
                    onClose={() => setCustomerDetailsModalOpen(false)}
                    customerId={selectedCustomerId}
                />
            )}
        </>
    );
};

export default CustomerstTable;
