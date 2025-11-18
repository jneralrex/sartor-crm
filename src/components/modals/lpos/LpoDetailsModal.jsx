import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useToken,useRole } from '../../../store/authStore';
import instance from '../../../utils/axiosInstance';
import DetailsSkeleton from '../../DetailsSkeleton';

const LpoDetailsModal = ({ onClose, lpoId, onSuccess }) => {
    const  token  = useToken();
    
    
    


    const [singleLpo, setSingleLpo] = useState({});
    const [loading, setLoading] = useState(false);
    const [statusUploadLoading, setStatusUploadLoading] = useState(false);

    const [updatedStatus, setUpdatedStatus] = useState({
        id: lpoId,
        status: '',
    });

    useEffect(() => {
        if (!lpoId) return;

        const singleLpo = async () => {
            setLoading(true);
            try {
                const res = await instance.get(`lpo/${lpoId}`);

                console.log(res);
                setSingleLpo(res.data.data);
               
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };

        singleLpo();
    }, [token, lpoId]);

    const handleChange = (e) => {
        setUpdatedStatus({ ...updatedStatus, [e.target.name]: e.target.value });
    };

    const updateStatus = async (e) => {
        e.preventDefault();
         setStatusUploadLoading(true);

        if (!lpoId) return;
        try {
            const res = await instance.put(`/lpo/status/update`, updatedStatus);

            console.log(res);
             onSuccess?.(res.data.data.updatedLPO);
                 onClose();
        } catch (error) {
         setStatusUploadLoading(false);

            console.error("Error updating lead status:", error);
        }
    }

    console.log(updatedStatus)

    if (loading) return <DetailsSkeleton />;
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[480px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <span className='text[#1A1A1A] font-semibold text-[20px] text-start w-full'>LPO Details </span>
                    <button onClick={onClose}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                <div className=" py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">

                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Name

                        <span className='text-[#484848] mt-2 w-[150px]'>
                            {singleLpo?.lead?.name || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        ID

                        <span className='text-[#484848] mt-2'>
                            {singleLpo?.lead?.userId || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Email address

                        <span className='text-[#484848] mt-2'>
                            {singleLpo?.lead?.email || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Phone Number

                        <span className='text-[#484848] mt-2'>
                            {singleLpo?.lead?.phone || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Amount

                        <span className='text-[#484848] mt-2'>
                            {Array.isArray(singleLpo.products)
                                ? singleLpo.products.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
                                : 'NA'}

                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Date Created

                        <span className='text-[#484848] mt-2'>
                            {singleLpo?.creationDateTime
                                ? new Date(singleLpo.creationDateTime).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })
                                : 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        LPO Status

                        <span className='text-[#484848] mt-2'>
                                                        {singleLpo?.lpo?.status || 'NA'}

                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Status

                        <span className=' text-primary_blue mt-2 cursor-pointer'>
                       {singleLpo?.status || 'NA'}
                        </span>
                    </label>


                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Address

                        <span className='text-[#484848] mt-2'>
                            {singleLpo?.lead?.address || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Qty
                        <span className='text-[#484848] mt-2'>
                            {Array.isArray(singleLpo.products)
                                ? singleLpo.products.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
                                : 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Payment Terms

                        <span className='text-[#484848] mt-2'>
                            {singleLpo?.terms || 'NA'}
                        </span>
                    </label>
                </div>
                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                    Product(s)
                    <span className='text-[#484848] mt-2 flex flex-row items-center'>
                        <ul className='grid grid-cols-2 list-disc gap-x-10'>
                            {Array.isArray(singleLpo.products) && singleLpo.products.length > 0 ? (
                                singleLpo.products.map((item) => (
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

                    <span className='text-[#484848] mt-2 flex items-center gap-5'>
                                                    {singleLpo?.status || 'NA'}

                    </span>
                </label>

                <Select label="Update Status" name="status" value={updatedStatus.status} onChange={handleChange} options={["Packed", "In-Transit", "Supplied/Delivered", "Cancelled", "Paid"]} />
                <button className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]"
                    onClick={updateStatus}
                >
                   {statusUploadLoading ? "updating" : "Update Status"}
                </button>
            </div>
        </div>
    )
}


// Reusable Select Component
const Select = ({ label, name, value, onChange, options = [] }) => (
    <label className="block text-sm font-medium text-[#1A1A1A] mt-5 mb-3">
        {label}
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 w-full h-[48px] bg-[#F5F5F5] rounded-lg px-4 text-sm text-[#484848] outline-none"
        >
            <option value="">Select {label}</option>
            {options.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
            ))}
        </select>
    </label>
);

export default LpoDetailsModal



