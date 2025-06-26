import React, { useState } from 'react'
import TaskNotesModal from '../taskManager/TaskNotesModal';
import { X } from 'lucide-react';

const EmployeeDetails = ({onClose}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  


    const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
    };
   
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <span className='text[#1A1A1A] font-semibold text-[20px] text-start w-full'>Task Details </span>
                    <button onClick={onClose}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                <div className=" py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">

                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Name

                        <span className='text-[#484848] mt-2 w-[150px]'>
                            Kare Johnson
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        ID

                        <span className='text-[#484848] mt-2'>
                            SMO2231-12
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Email Address

                        <span className='text-[#484848] mt-2'>
                           karekal23@gmail.com
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       Phone Number

                        <span className='text-[#484848] mt-2'>
                            (847) 785-2310
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Position

                        <span className='text-[#484848] mt-2'>
                            Admin
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Date Created

                        <span className='text-[#484848] mt-2'>
                            12, Feb 2023
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Last Login

                        <span className='text-[#484848] mt-2'>
                            12, Feb 2023
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
