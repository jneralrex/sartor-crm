import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useToken } from '../../../store/authStore';
import instance from '../../../utils/axiosInstance';
import DetailsSkeleton from '../../DetailsSkeleton';

const InvoiceDetailsModal = ({ onClose, invoiceId }) => {
    const token = useToken();

    const [singleInvoice, setSingleInvoice] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!invoiceId) return;

        const singleLpo = async () => {
            setLoading(true);
            try {
                const res = await instance.get(`invoice/${invoiceId}`);

                console.log(res);
                setSingleInvoice(res.data.data);

            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };

        singleLpo();
    }, [token, invoiceId]);

    if (loading) return <DetailsSkeleton />;
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-x-hidden overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <span className='text[#1A1A1A] font-semibold text-[20px] text-start w-full'>Invoice Details </span>
                    <button onClick={onClose}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                <div className=" py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-30 gap-y-4">

                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Name

                        <span className='text-[#484848] mt-2 w-[150px]'>
                            {singleInvoice?.name || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        ID

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.invoiceId || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Sales Rep

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.lead?.name || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] text-[14px]">
                        Email address

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.lead?.email || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Phone Number

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.lead?.phone || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Amount

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.totalAmount || 'NA'}

                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Date Created

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.creationDateTime
                                ? new Date(singleInvoice.creationDateTime).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })
                                : 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Due Date

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.dueDate
                                ? new Date(singleInvoice.dueDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })
                                : 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        LPO ID
                        <span> {singleInvoice?.lpo?._id || 'NA'}</span>

                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Status

                        <span className=' text-primary_blue mt-2 cursor-pointer'>
                            {singleInvoice?.status || 'NA'}
                        </span>
                    </label>


                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Address

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.lead?.address || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Total Qty

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.qty || 'NA'}

                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Payment Terms

                        <span className='text-[#484848] mt-2'>
                            {singleInvoice?.lpo?.terms || 'NA'}
                        </span>
                    </label>
                </div>
                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                    Product(s)

                    <span className='text-[#484848] mt-2 flex flex-row items-center'>
                        <ul className='grid grid-cols-2 list-disc gap-x-10'>
                            {Array.isArray(singleInvoice.lpoProducts) && singleInvoice.lpoProducts.length > 0 ? (
                                singleInvoice.lpoProducts.map((item) => (
                                    <li key={item._id}>
                                        {item.product?.productName || 'Unnamed Product'} x {item.quantity}
                                    </li>
                                ))
                            ) : (
                                <li>No products</li>
                            )}

                        </ul>
                    </span>
                </label>
                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                    Delivery Status

                    {/* <span className='text-[#484848] mt-2 flex items-center gap-5'>
                        <div>Packaging</div>
                        <div className='border border-primary_blue w-[40px]' />
                        <div>In Transit</div>
                        <div className='border border-primary_blue w-[40px]' />
                        <div className='line-through'>Delivered</div>
                    </span> */}
                </label>


            </div>
        </div>
    )
}

export default InvoiceDetailsModal
