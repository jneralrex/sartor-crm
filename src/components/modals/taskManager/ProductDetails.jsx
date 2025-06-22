import { ArrowLeft } from 'lucide-react';

const ProductDetails = ({onClose}) => {
   
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
                        <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Products(s) Details</h2>
                    </div>
                </div>

                {/* Uploaded File Name Box */}
                <div className=" py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">

                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Product Name

                        <span className='text-[#484848] mt-2 w-[150px]'>
                            Bag of Cement x 2
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       Unit Price

                        <span className='text-[#484848] mt-2'>
                            N50,000
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Product Name

                        <span className='text-[#484848] mt-2 w-[150px]'>
                            Bag of Cement x 2
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                       Unit Price

                        <span className='text-[#484848] mt-2'>
                            N50,000
                        </span>
                    </label>
                    <label htmlFor="" className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Total Amount

                        <span className='text-[#484848] mt-2'>
                           N100,000,000
                        </span>
                    </label>
                </div>


                <button className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[375px]" onClick={(e) => {
                    e.preventDefault();
                    // handleModalToggle();
                }} >
                   Download Invoice
                </button>

            </div>
            {/* Modal */}
            {/* {isModalOpen && <TaskNotesModal onCloseModal={handleModalToggle} />} */}

        </div>
    )
}

export default ProductDetails
