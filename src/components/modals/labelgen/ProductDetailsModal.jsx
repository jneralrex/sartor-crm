import { X } from 'lucide-react';
import React, { useState } from 'react';
import ProductLabelModal from './ProductLabelModal';

const ProductDetailsModal = ({ onClose }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className='flex items-center justify-between'>
          <div>
            <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Product Details</h2>
            <p className='text-xs font-semibold text-[#767676]'>The following data servers as proof of authenticity for this product</p>
          </div>
          <button
            onClick={onClose}
            className=""
          >
            <X />
          </button>
        </div>
        <div>

          <form action="" className='flex flex-col gap-5 mt-5'>
             <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Batch ID
              <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                <input type="text" placeholder='Enter batch number' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
                <button className='w-[150px] bg-primary_blue text-primary_white h-[30px] text-[12px] p-1 rounded-md '>Generate Batch No</button>
              </div>
            </label>
            <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Batch Quantity
              <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                <input type="text" placeholder='Enter quantity' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
              </div>
            </label>
            <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Batch Quantity
              <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                <input type="text" placeholder='Enter quantity' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
              </div>
            </label>
            <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Batch Quantity
              <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                <input type="text" placeholder='Enter quantity' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
              </div>
            </label>
            <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Batch Quantity
              <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                <input type="text" placeholder='Enter quantity' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
              </div>
            </label>
            <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Batch Quantity
              <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                <input type="text" placeholder='Enter quantity' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
              </div>
            </label>
            <button className='bg-primary_blue  text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]' onClick={(e) => {
              e.preventDefault();
              handleModalToggle();
            }} >
              Proceed with details
            </button>
          </form>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && <ProductLabelModal onCloseModal={handleModalToggle} />}
    </div>
  );
};

export default ProductDetailsModal;
