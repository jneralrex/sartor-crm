import React, { useEffect, useState } from 'react'
import TaskNotesModal from '../taskManager/TaskNotesModal';
import { X } from 'lucide-react';
import instance from '../../../utils/axiosInstance';
import { useAuth } from '../../../context/AuthContext';

const EmployeeDetails = ({onClose, employeeId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleEmployee, setSingleEmployee] = useState({});
    const { token } = useAuth();
  
  useEffect(() => {
        if (!employeeId) return;

        const getSingleEmployee = async () => {
            try {
                const res = await instance.get(`user/${employeeId}`);

                console.log(res);
                setSingleEmployee(res.data.data);

            } catch (error) {
                console.log(error);
            }
        };

        getSingleEmployee();
    }, [token, employeeId]);

    const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
    };

    console.log(singleEmployee)
   
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <span className='text[#1A1A1A] font-semibold text-[20px] text-start w-full'>Employee Details </span>
                    <button onClick={onClose}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                <div className=" py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">

                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Name

                        <span className='text-[#484848] mt-2 w-[150px]'>
                            {singleEmployee?.fullName || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        ID

                        <span className='text-[#484848] mt-2'>
                             {singleEmployee?.userId || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Email Address

                        <span className='text-[#484848] mt-2'>
                           {singleEmployee?.email || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       Phone Number

                        <span className='text-[#484848] mt-2'>
                            {singleEmployee?.phone || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Position

                        <span className='text-[#484848] mt-2'>
                            {singleEmployee?.role || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Date Created

                        <span className='text-[#484848] mt-2'>
                             {singleEmployee?.creationDateTime ? new Date(singleEmployee.creationDateTime).toLocaleDateString() : 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Last Login

                        <span className='text-[#484848] mt-2'>
                            { singleEmployee?.online || 'NA'}
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Features

                        <span className='underline text-primary_blue mt-2 cursor-pointer' onClick={(e) => {
                            e.preventDefault();
                            handleModalToggle();
                        }}>
                            View All Features
                        </span>
                    </label>


                </div>
             


            </div>
            {/* Modal */}
            {isModalOpen && <TaskNotesModal onCloseModal={handleModalToggle} />}

        </div>
    )
}

export default EmployeeDetails
