import { Download, Ellipsis, Option, OptionIcon, Plus, Thermometer } from 'lucide-react';
import search from '../../assets/images/search.png';
import { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react'
import { useAuth } from '../../context/AuthContext';
import InvoiceDetailsModal from '../../components/modals/invoice/InvoiceDetailsModal';
import instance from '../../utils/axiosInstance';
import ConfirmModal from '../../components/ConfirmationPopUp';
import UniversalSearch from '../../components/UniversalSearch';


const InvoiceTable = ({ }) => {
    const { token } = useAuth();

    const [getInvoices, setGetInvoices] = useState([]);
    const [isViewInvoiceModalOpen, setViewLpoModalOpen] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10;


    const filteredInvoice = getInvoices;

    const getAllInvoices = async (page = 1) => {
        try {
            const res = await instance.get(`invoices?page=${page}&limit=${perPage}`);
            const { data, totalPages } = res.data.data;
            setGetInvoices(res.data.data.invoices);
            setTotalPages(totalPages || 1);

            console.log(res);

        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };


    const confirmDelete = async () => {
        if (!invoiceToDelete) return;
        try {
            await instance.delete(`invoice/delete/${invoiceToDelete}`);
            getAllInvoices();
        } catch (error) {
            console.error('Failed to delete batch:', error);
        } finally {
            setIsConfirmOpen(false);
            setInvoiceToDelete(null);
        }
    };


    useEffect(() => {
        getAllInvoices(currentPage);
    }, [currentPage, token]);

    const handleViewInvoiceModalToggle = (id) => {
        setSelectedInvoiceId(id);
        setViewLpoModalOpen(true);
    };


    return (
        <>
            <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
                <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
                    <UniversalSearch
                        collection="Invoice"
                        placeholder="Search by ID, name or email"
                        onResults={(results) => setGetInvoices(results)}
                        auto={true}
                    />
                </div>
                <div className="flex gap-2">
                    <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[12px] font-[sfpro]'>Download csv</span></buttton>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-left text-sm bg-primary_white">
                    <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
                        <tr className=''>
                            <th className="px-4 py-2">S/N</th>
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
                        {filteredInvoice.map((invoice, index) => (
                            <tr key={invoice._id} className="border-b hover:bg-gray-50 text-start">
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                                    {(currentPage - 1) * perPage + index + 1}
                                </td>                                <td className="px-4 py-3 flex items-center gap-2">
                                    <div>
                                        <div className="text-xs md:text-[14px] font-medium text-[#484848]">
                                            {invoice.name || 'N/A'}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                                    {invoice.products || 'N/A'}
                                </td>
                                <td className={`px-4 py-3 text-xs md:text-[14px] font-normal ${invoice.status === 'Paid'
                                    ? ' text-[#33DF69]'
                                    : invoice.status === 'Cancelled'
                                        ? ' text-[#FF6259]'
                                        : invoice.status === 'Overdue'
                                            ? ' text-[#000068]'
                                            : invoice.status === 'Partially Paid'
                                                ? ' text-[#7474E1]'
                                                : invoice.status === 'Pending'
                                                    ? ' text-[#FFB400]'
                                                    : ' text-gray-500'
                                    }`}>
                                    {invoice.status}
                                </td>
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                                    {invoice.dueDate
                                        ? new Date(invoice.dueDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })
                                        : 'N/A'}
                                </td>
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                                    {invoice.totalAmount || 'N/A'}
                                </td>
                                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                                    {invoice.qty || 'N/A'}
                                </td>
                                <td className="px-4 py-3 ">
                                    {/* Menu Dropdown */}
                                    <div className="relative">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
                                                <button className="text-gray-500 hover:text-gray-700"><Ellipsis /></button>

                                            </Menu.Button>

                                            <Menu.Items className="absolute p-2 right-0 z-[99] w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-gray-100 rounded-md' : ''
                                                                    } group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                                                onClick={() => handleViewInvoiceModalToggle(invoice._id)}
                                                            >
                                                                View Details
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-red-200 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-red-500`}
                                                                onClick={() => {
                                                                    setInvoiceToDelete(invoice._id);
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
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>Page {currentPage} of {totalPages}</span>
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        className="px-2 py-1 border rounded text-gray-500"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-2 py-1 border rounded ${currentPage === i + 1 ? 'bg-primary_blue text-white' : ''}`}
                        >
                            {i + 1}
                        </button>
                    )).slice(0, 5)}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        className="px-2 py-1 border rounded text-gray-500"
                    >
                        Next
                    </button>
                </div>
            </div>


            {isViewInvoiceModalOpen && (<InvoiceDetailsModal onClose={() => {
                setViewLpoModalOpen(false);
                setSelectedInvoiceId(null);
            }}
                invoiceId={selectedInvoiceId}
            />
            )}

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Invoice"
                message="Are you sure you want to delete this Invoice? This action is irreversible."
            />

        </>
    );
}

export default InvoiceTable
