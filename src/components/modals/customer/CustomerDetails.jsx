import React, { useEffect, useState } from 'react'
import TaskNotesModal from '../taskManager/TaskNotesModal';
import { X } from 'lucide-react';
import instance from '../../../utils/axiosInstance';
import DetailsSkeleton from '../../DetailsSkeleton';
import { useToken } from '../../../store/authStore';

const CustomerDetails = ({ onClose, customerId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleEmployee, setSingleEmployee] = useState({});
    const  token  = useToken();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!customerId) return;

        const getSingleEmployee = async () => {
            setLoading(true);
            try {
                const res = await instance.get(`customer/${customerId}`);

                console.log(res);
                setSingleEmployee(res.data.data);

            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };

        getSingleEmployee();
    }, [token, customerId]);

    const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
    };

    if (loading) return <DetailsSkeleton />;

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <span className='text[#1A1A1A] font-semibold text-[20px] text-start w-full'>Customer Details </span>
                    <button onClick={onClose}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                <div className="py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Name
                        <span className='text-[#484848] mt-2'>{singleEmployee?.lead?.name || 'NA'}</span>
                    </label>
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Customer ID
                        <span className='text-[#484848] mt-2'>{singleEmployee?.customerId || 'NA'}</span>
                    </label>
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Email Address
                        <span className='text-[#484848] mt-2'>{singleEmployee?.lead?.email || 'NA'}</span>
                    </label>
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Phone Number
                        <span className='text-[#484848] mt-2'>{singleEmployee?.lead?.phone || 'NA'}</span>
                    </label>
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        State
                        <span className='text-[#484848] mt-2'>{singleEmployee?.lead?.state || 'NA'}</span>
                    </label>
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Address
                        <span className='text-[#484848] mt-2'>{singleEmployee?.lead?.address || 'NA'}</span>
                    </label>
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Business Type
                        <span className='text-[#484848] mt-2'>{singleEmployee?.lead?.type || 'NA'}</span>
                    </label>
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Deal Size
                        <span className='text-[#484848] mt-2'>{singleEmployee?.lead?.dealSize || 'NA'}</span>
                    </label>
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Date Created
                        <span className='text-[#484848] mt-2'>
                            {singleEmployee?.creationDateTime
                                ? new Date(singleEmployee.creationDateTime).toLocaleDateString()
                                : 'NA'}
                        </span>
                    </label>
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Status
                        <span className='text-[#484848] mt-2'>{singleEmployee?.status || 'NA'}</span>
                    </label>
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        User ID
                        <span className='text-[#484848] mt-2'>{singleEmployee?.lead?.userId || 'NA'}</span>
                    </label>
                    {/* <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Features
                        <span
                            className='underline text-primary_blue mt-2 cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                handleModalToggle();
                            }}
                        >
                            View All Features
                        </span>
                    </label> */}
                </div>




            </div>
            {/* Modal */}
            {isModalOpen && <TaskNotesModal onCloseModal={handleModalToggle} />}

        </div>
    )
}

export default CustomerDetails
