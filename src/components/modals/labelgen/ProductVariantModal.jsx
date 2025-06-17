import { X } from 'lucide-react';
import { useState } from 'react';
import labelgen from '../../../assets/images/labelgen.png'
import QrCodeModal from './QrCodeModal';

const ProductVariantModal = ({ onClose }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
   <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-[#1A1A1A]">Upload Product Label</h2>
            <p className="text-xs text-[#767676]">Upload formats: png, jpg or pdf</p>
          </div>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Uploaded File Name Box */}
        <div className='mb-4 py-4 rounded-md items-center max-w-[375px] grid grid-cols-2 gap-5'>
          <img src={labelgen} alt="" className='rounded-md ' />
          <img src={labelgen} alt="" className='rounded-md ' />
          <img src={labelgen} alt="" className='rounded-md ' />
          <img src={labelgen} alt="" className='rounded-md ' />
          <img src={labelgen} alt="" className='rounded-md ' />
          <img src={labelgen} alt="" className='rounded-md ' />
        </div>
        
        <button className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[375px]" onClick={(e) => {
          e.preventDefault();
          handleModalToggle();
        }} >
          Continue with Variant
        </button>
         {/* Proceed Button */}
      </div>
      {/* Modal */}
      {isModalOpen && <QrCodeModal onCloseModal={handleModalToggle} />}
    </div>
  );
};

export default ProductVariantModal;

