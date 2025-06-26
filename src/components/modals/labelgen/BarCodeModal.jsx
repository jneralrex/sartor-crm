import { X } from 'lucide-react';
import { useState } from 'react';
import barcode from '../../../assets/images/barcode.png'
import QrCodeDetailsModal from './QrCodeDetailsModal';

const BarCodeModal = ({onCloseModal}) => {
const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
return(
  
  <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar flex flex-col justify-between">
        {/* Header */}
      <div className='w-full text-center flex items-center justify-between'>
        <span className='text[#1A1A1A] font-semibold text-[20px] text-center w-full'>Bar Code Linking to Label Check</span>
         <button onClick={onCloseModal}>
            <X className="text-gray-500 hover:text-black" />
          </button>
      </div>

        <div className='mb-4 py-4 rounded-md items-center max-w-[375px] gap-5 flex justify-center'>
            <img src={barcode} alt="" srcset="" />
        </div>
        
        {/* Proceed Button */}
        <div className='flex gap-2'>

        <button className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]" onClick={(e) => {
          e.preventDefault();
          handleModalToggle();
        }} >
          Download
        </button>
        <button className="bg-primary_grey text-[#484848] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]" onClick={(e) => {
          e.preventDefault();
          handleModalToggle();
        }} >
          View Details
        </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && <QrCodeDetailsModal onCloseModal={handleModalToggle} />}
    </div>
    )
}

export default BarCodeModal
