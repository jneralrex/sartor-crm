import { Download, Ellipsis, } from 'lucide-react';
import search from '../../assets/images/search.png';
import { useEffect, useState } from 'react';
import instance from '../../utils/axiosInstance';
import { Menu } from '@headlessui/react';
import CustomerDetails from '../../components/modals/customer/CustomerDetails';
import ConfirmModal from '../../components/ConfirmationPopUp';
import UniversalSearch from '../../components/UniversalSearch';
import EmployeeSkeletonRow from '../../components/EmployeeSkeletonRow';
import { useToken, useUserId } from '../../store/authStore';
import { paginationNormalizer } from '../../utils/pagination/paginationNormalizer';
import UniversalPagination from '../../components/UniversalPagination';

const CustomerstTable = ({ onClose }) => {
    const token = useToken();
    const userId = useUserId
    const [getAllCustomer, setGetAllCustomer] = useState([]);
    const [isCustomerDetailsModalOpen, setCustomerDetailsModalOpen] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [customerToEdit, setCustomerToEdit] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [pagination, setPagination] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [searchActive, setSearchActive] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 100;

    // syncing currentPage with backend pagination
    useEffect(() => {
        if (pagination?.currentPage) {
            setCurrentPage(pagination.currentPage);
        }
    }, [pagination]);

    const allCustomer = async (page = 1) => {
        setLoading(true);

        try {
            const res = await instance.get(`customers?page${page}limit=${perPage}`);
            console.log(res);


            const customerArray = res.data?.data?.data || [];
            const paginationData = paginationNormalizer(res.data?.data?.pagination);
            setPagination(paginationData);

            setGetAllCustomer(customerArray);
        } catch (error) {
            console.log(error);
            setPagination(paginationNormalizer());

        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = searchActive ? searchResults : getAllCustomer;


    useEffect(() => {
        allCustomer(currentPage);
    }, [currentPage, token]);

    const handleViewCustomerDetailModalToggle = (id) => {
        setSelectedCustomerId(id);
        setCustomerDetailsModalOpen(true);
    };

    const handleDeleteCustomer = async () => {
        if (!customerToDelete) return;
        try {
            await instance.delete(`/customer/delete/${customerToDelete}`);

            allCustomer();
        } catch (error) {
            console.error("Failed to delete customer:", error);
            alert("An error occurred while deleting the customer.");
        }
        finally {
            setIsConfirmOpen(false);
            setCustomerToDelete(null);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
                <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
                    <UniversalSearch
                        collection="customer"
                        searchPath="customers"
                        placeholder="Search"
                        onResults={(results, query, paginationData) => {
                            if (query) {

                                setSearchResults(results || []);
                                setSearchActive(true);
                                setCurrentPage(paginationData);
                            } else {
                                setSearchActive(false);
                                setSearchResults([]);
                                allLeads(1);

                            }
                        }}
                        auto={true}
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
                        {loading ? (
                            Array.from({ length: 8 }).map((_, idx) => <EmployeeSkeletonRow key={idx} />)
                        ) : filteredCustomers.length > 0 ?
                            (filteredCustomers.map((emp, index) => (
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
                                                                    onClick={() => {
                                                                        setCustomerToEdit(emp);
                                                                        setIsEditModalOpen(true);
                                                                    }}
                                                                >
                                                                    Edit
                                                                </button>
                                                            )}
                                                        </Menu.Item>

                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${active ? 'bg-red-200 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-red-500`}
                                                                    onClick={() => {
                                                                        setCustomerToDelete(emp._id);
                                                                        setIsConfirmOpen(true);
                                                                    }}
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
                            ))
                            ) : (<tr>
                                <td colSpan="7" className="text-center py-4 text-red-500">
                                    No Customer Found
                                </td></tr>)}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && (
                <UniversalPagination
                    pagination={pagination}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
            {isEditModalOpen && customerToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Edit Customer Status</h2>
                        <select
                            className="w-full border rounded px-3 py-2 mb-4"
                            value={customerToEdit.status}
                            onChange={(e) =>
                                setCustomerToEdit((prev) => ({ ...prev, status: e.target.value }))
                            }
                        >
                            {[
                                "Active", "In-active"
                            ].map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 rounded bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        console.log("Editing customer ID:", customerToEdit._id);
                                        console.log("New status:", customerToEdit.status);
                                        await instance.put(`/customer/edit/${customerToEdit._id}`, {
                                            status: customerToEdit.status,
                                        });
                                        console.log(customerToEdit)
                                        allCustomer();
                                        setIsEditModalOpen(false);
                                    } catch (err) {
                                        console.error("Error updating customer:", err);
                                        alert("Failed to update customer status.");
                                    }
                                }}
                                className="px-4 py-2 rounded bg-blue-600 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {isCustomerDetailsModalOpen && (
                <CustomerDetails
                    onClose={() => setCustomerDetailsModalOpen(false)}
                    customerId={selectedCustomerId}
                />
            )}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDeleteCustomer}
                title="Delete Customer"
                message="Are you sure you want to delete this Customer? This action is irreversible."
            />
        </>
    );
};

export default CustomerstTable;
