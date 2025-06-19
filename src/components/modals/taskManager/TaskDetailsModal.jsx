import { X } from 'lucide-react';
 import { useState } from 'react'
 import QrCodeModal from '../labelgen/QrCodeModal';
 import BarCodeModal from '../labelgen/BarCodeModal'


const TaskDetailsModal = ({onClose}) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
     const [isBarModalOpen, setIsBarModalOpen] = useState(false);


    const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleBarModalToggle = () => {
        setIsBarModalOpen((prev) => !prev);
    };
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <span className='text[#1A1A1A] font-semibold text-[20px] text-start w-full'>QR Code </span>
                    <button onClick={onClose}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                {/* Uploaded File Name Box */}
                <div className=" py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">

                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       Tittle

                        <span className='text-[#484848] mt-2 w-[150px]'>
                           Follow up on this Client: Tamsy Tech
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Phone Number

                        <span className='text-[#484848] mt-2'>
                          (847) 785-2310
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       Employee's Name

                        <span className='text-[#484848] mt-2'>
                           Liam Carter
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                         Date Created

                        <span className='text-[#484848] mt-2'>
                            12, Feb 2023
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Email Address

                        <span className='text-[#484848] mt-2'>
                           karekal23@gmail.com
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Role

                        <span className='text-[#484848] mt-2'>
                           Admin
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       Due On

                        <span className='text-[#484848] mt-2'>
                           14, Feb 2023
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Assigned

                        <span className='underline text-primary_blue mt-2 cursor-pointer' onClick={(e) => {
                            e.preventDefault();
                            // handleModalToggle();
                        }}>
                            View
                        </span>
                    </label>
                   
                   
                  
                </div>
                 <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       Description 

                        <span className='text-[#484848] mt-2'>
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro explicabo ipsa ipsum adipisci! Quisquam, eaque.
                        </span>
                    </label>

                     <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       Notes from Employee

                        <span className='text-[#484848] mt-2'>
                        N/A
                        </span>
                    </label>


               
            </div>
            {/* Modal */}
            {isModalOpen && <QrCodeModal onCloseModal={handleModalToggle}/>}
            {isBarModalOpen && <BarCodeModal onCloseModal={handleBarModalToggle} />}
        </div>
    )
}

export default TaskDetailsModal
