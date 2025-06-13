import { X } from 'lucide-react';
import React, { useState } from 'react';
import ProductLabelModal from './ProductLabelModal';

const ProductVariantModal = ({ onClose }) => {

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
        <div className='flex  flex-col mt-5 mb-5 gap-1'>
          <span className='text-[#A3A3A3] text-[14px] font-medium'>
            Batch ID
          </span>
          <span className='text-[#484848] text-[16px] font-medium'>
            BAR121-10
          </span>
        </div>
        <div>

          <form action="" className='flex flex-col gap-5'>
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

export default ProductVariantModal;

