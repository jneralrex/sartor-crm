import { X } from 'lucide-react';
import React from 'react'

const AssignEmployeeTask = ({onClose}) => {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className='flex items-center justify-between'>
          <div>
            <h2 className="text-sm md:text-[16px] font-semibold text-[#767676]  mb-1">Assign Sales Rep to</h2>
            <p className='text-xs font-semibold text-[#1A1A1A] md:text-[20px]'>Martin Kelvin</p>
          </div>
          <button
            onClick={onClose}
            className=""
          >
            <X />
          </button>
        </div>
        

          <form action="" className='flex flex-col gap-5 mt-5 justify-between h-full'>
         
            <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Rep's Full Name
              <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                <input type="text" placeholder='Enter Sales Rep name here' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
              </div>
            </label>
          
            <button className='bg-primary_blue  text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]' onClick={(e) => {
              e.preventDefault();
              handleModalToggle();
            }} >
              Assign Reps
            </button>
          </form>
        </div>
      {/* Modal */}
      {/* {isModalOpen && <ProductLabelModal onCloseModal={handleModalToggle} />} */}
    </div>
  )
}

export default AssignEmployeeTask
