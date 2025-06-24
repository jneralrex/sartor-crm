import { X } from 'lucide-react';
import React from 'react'

const LpoDetailsModal = ({onClose}) => {
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <span className='text[#1A1A1A] font-semibold text-[20px] text-start w-full'>LPO Details </span>
                    <button onClick={onClose}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                {/* Uploaded File Name Box */}
                <div className=" py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">

                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Name

                        <span className='text-[#484848] mt-2 w-[150px]'>
                            Transcorp Ltd
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       ID

                        <span className='text-[#484848] mt-2'>
                            SMO2231-12
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Email address

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
                        Amount

                        <span className='text-[#484848] mt-2'>
                            NGN12,322,000
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Date Created

                        <span className='text-[#484848] mt-2'>
                            12, Fev 2023
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        LPO Status

                        <span className='text-[#484848] mt-2'>
                            Delivered
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Status

                        <span className=' text-primary_blue mt-2 cursor-pointer'>
                            Paid
                        </span>
                    </label>


                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Address

                        <span className='text-[#484848] mt-2'>
                            12, Jakande Street Lagos
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Qty

                        <span className='text-[#484848] mt-2'>
                            12232
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Payment Terms

                        <span className='text-[#484848] mt-2'>
                            Payment On Delivery
                        </span>
                    </label>
                </div>
                <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                    Product(s) 

                    <span className='text-[#484848] mt-2 flex flex-row items-center'>
                   <ul className='grid grid-cols-2 list-disc gap-x-10'>
                    <li>Bag of cement x 2</li>
                    <li>Bag of corn x 4</li>
                    <li>Bag of corn x 4</li>
                    <li>Bag of corn x 4</li>
                   </ul>
                    </span>
                </label>
                     <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Delivery Status

                        <span className='text-[#484848] mt-2 flex items-center gap-5'>
                            <div>Packaging</div>
                            <div className='border border-primary_blue w-[40px]'/>
                            <div>In Transit</div>
                            <div className='border border-primary_blue w-[40px]'/>
                            <div className='line-through'>Delivered</div>
                        </span>
                    </label>


            </div>
            {/* Modal */}
            {/* {isModalOpen && <TaskNotesModal onCloseModal={handleModalToggle} />}
            {isAssignModalOpen && <AssignToNewEmployee onClose={handleAssignModalToggle} />}
            {isReAssignModalOpen && <ReassignTaskModal onClose={handleReAssignModalToggle} />}
            {isInvoiceModalOpen && <InvoiceModal onClose={handleInvoiceModalToggle} />} */}

        </div>
    )
}

export default LpoDetailsModal
