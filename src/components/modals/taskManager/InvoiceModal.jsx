import { ArrowLeft } from 'lucide-react';
import ProductDetails from './ProductDetails';
import { useState } from 'react';

const InvoiceModal = ({onClose}) => {
       const [isProductDetailsModalOpen, setProductDetailsModalOpen] = useState(false);

     const handleProductDetailsModalToggle = () => {
        setProductDetailsModalOpen((prev) => !prev);
    };
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center gap-5'>

                    <button
                        onClick={onClose}
                        className=""
                    >
                        <ArrowLeft />
                    </button>
                    <div>
                        <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Invoice Details</h2>
                    </div>
                </div>

                {/* Uploaded File Name Box */}
                <div className=" py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">

                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Customer

                        <span className='text-[#484848] mt-2 w-[150px]'>
                            Medplud
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       ID

                        <span className='text-[#484848] mt-2'>
                            INV2231-12
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
                        Amount To Pay

                        <span className='text-[#484848] mt-2'>
                           NGN12,322,000
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Date Created

                        <span className='text-[#484848] mt-2'>
                            12, Feb 2023
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Status

                        <span className='underline text-primary_blue mt-2 cursor-pointer'>
                            Assigned
                        </span>
                    </label>

                     <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Due On

                        <span className='text-[#484848] mt-2'>
                            14, Feb 2023
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        LPO ID

                        <span className='text-[#484848] mt-2'>
                            2025-03-10
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Total Quantity

                        <span className='text-[#484848] mt-2'>
                            1200
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Address

                        <span className='text-[#484848] mt-2'>
                           12 Jakande Street Lagos
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                    Payment Terms 

                    <span className='text-[#484848] mt-2'>
                    Payment on delivery
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

                   <div className='underline text-primary_blue'onClick={(e) => {
                            e.preventDefault();
                            handleProductDetailsModalToggle();
                        }}>View More </div>
                    </span>
                </label>


                <button className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[375px]" onClick={(e) => {
                    e.preventDefault();
                    // handleModalToggle();
                }} >
                   Download Invoice
                </button>

            </div>
            {/* Modal */}
            {/* {isModalOpen && <TaskNotesModal onCloseModal={handleModalToggle} />} */}
            {isProductDetailsModalOpen && <ProductDetails onClose={handleProductDetailsModalToggle}/>}

        </div>
    )
}

export default InvoiceModal
