import { X } from 'lucide-react'
import React from 'react'

const SystemSettingModal = ({onClose}) => {
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[99]">
            <div className="bg-white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] md:h-[480px] rounded-xl overflow-y-auto hide-scrollbar relative">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[20px] font-semibold text-[#333843]">Edit Personal Info</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <div className='flex flex-col h-full justify-between'>
                   <div className='flex justify-between'>
                     <p className='font-semibold text-[14px] text-[#333843]'>Set Sales Rep Commission</p>
                    <span className='bg-[#E8E8E8] p-2 font-semibold text-[14px] text-[#333843]'>20%</span>
                   </div>

                    <button
                    className=" w-full py-3 bg-primary_blue text-white rounded-md text-sm font-semibold hover:opacity-90 transition bottom-0"
                >
                    Confirm Changes
                </button>
                </div>
            </div>
        </div>
    )
}

export default SystemSettingModal
