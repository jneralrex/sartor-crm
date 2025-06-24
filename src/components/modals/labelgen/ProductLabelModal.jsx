import { X } from 'lucide-react';
import labelgen from '../../../assets/images/labelgen.png'
import ProductVariantModal from './ProductVariantModal';
import { useState } from 'react';

const ProductLabelModal = ({ onCloseModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleModalToggle = () => {
      setIsModalOpen((prev) => !prev);
    };
  
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar ">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-[#1A1A1A]">Upload Product Label</h2>
            <p className="text-xs text-[#767676]">Upload formats: png, jpg or pdf</p>
          </div>
          <button onClick={onCloseModal}>
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Uploaded File Name Box */}
        <div className='flex flex-col justify-center bg-[#F5F5F5] mb-4 py-4 rounded-md items-center h-[143px] max-w-[375px] m-auto'>
          <div className=" text-sm text-center text-[#767676] font-medium ">
            Sator_label.png

              {/* Upload Button */}
          <div className="">
            <button className="bg-primary_blue mt-4 text-[#F9F9F9] text-sm px-4 py-2 rounded-md">
              Upload image
            </button>
          </div>
          </div>
        

        </div>

        {/* Image Preview Section */}
        <div className="bg-[#4B4B4B] rounded-md mb-4 justify-center max-w-[375px] m-auto">
          {/* <p className="text-white text-sm font-medium mb-2">Sartor Instant Hand Sanitizer</p> */}
          <img
            src={labelgen} 
            alt="Product Preview"
            className="object-cover rounded"
          />
        </div>

      <div className='m-auto w-full max-w-[375px]'>

        {/* Proceed Button */}
        <button className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold  " onClick={(e) => {
              e.preventDefault();
              handleModalToggle();
            }} >
          Proceed with image
        </button>
      </div>
      </div>
            {/* Modal */}
            {isModalOpen && <ProductVariantModal onClose={handleModalToggle} />}
    </div>
  );
};

export default ProductLabelModal;
