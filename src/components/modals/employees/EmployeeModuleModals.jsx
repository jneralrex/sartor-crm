import { X } from 'lucide-react'

const EmployeeModuleModals = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Modules</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className=""
                    >
                        <X />
                    </button>
                </div>
                <div>

                  
                    <div>
                        coming soon
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeModuleModals
