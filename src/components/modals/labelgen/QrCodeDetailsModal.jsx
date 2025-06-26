import { X } from 'lucide-react';
import { useState } from 'react'
import QrCodeModal from './QrCodeModal';
import BarCodeModal from './BarCodeModal';


const QrCodeDetailsModal = ({ onCloseModal }) => {
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
                    <button onClick={onCloseModal}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                <div className="mb-4 py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">

                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Batch ID

                        <span className='text-[#484848] mt-2'>
                            BAR121-10
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Stock Qty

                        <span className='text-[#484848] mt-2'>
                            120
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Product Nane

                        <span className='text-[#484848] mt-2'>
                            Cocoa-Cola
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Expiry Date

                        <span className='text-[#484848] mt-2'>
                            2025-06-15
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Date Created

                        <span className='text-[#484848] mt-2'>
                            2025-02-20
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        View Qr Code

                        <span className='underline text-primary_blue mt-2 cursor-pointer' onClick={(e) => {
                            e.preventDefault();
                            handleModalToggle();
                        }}>
                            View
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        View Bar Code

                        <span className='underline text-primary_blue mt-2 cursor-pointer' onClick={(e) => {
                            e.preventDefault();
                            handleBarModalToggle();
                        }}>
                            View
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Manufacturer

                        <span className='text-[#484848] mt-2'>
                            Coca-Cola Inc
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Product Label

                        <span className='text-primary_blue mt-2'>
                            View Document
                        </span>
                    </label>

                </div>

                {/* Proceed Button */}
                <div className='flex gap-2'>

                    <button className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   handleModalToggle();
                    // }} 
                    >
                        Download
                    </button>
                    <button className="bg-primary_grey text-[#484848] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]" >
                        View Details
                    </button>
                </div>
            </div>
            {/* Modal */}
            {isModalOpen && <QrCodeModal onCloseModal={handleModalToggle} />}
            {isBarModalOpen && <BarCodeModal onCloseModal={handleBarModalToggle} />}
        </div>
    )
}

export default QrCodeDetailsModal
