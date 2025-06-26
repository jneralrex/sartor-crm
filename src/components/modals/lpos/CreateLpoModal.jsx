import { Plus, X } from 'lucide-react'


const CreateLpoModal = ({ onClose }) => {

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Create An LPO</h2>
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

                        <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Select Lead Name
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                                <Select options={['lead1', 'lead2']} />

                            </div>
                        </label>


                        <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Select Product
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                                <Select options={['Med1', 'Med2']} />

                            </div>
                        </label>

                        <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Select Payment Terms
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                                <Select options={['On-Delivery', 'Pre-Delivery']} />

                            </div>
                        </label>

                        <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>QTY
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                                <input type="text" placeholder='Quantity of Product' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
                            </div>
                        </label>

                        <div className='flex justify-between items-center'>
                            <div className='flex gap-2 text-[#484848] text-[16px] font-medium'>
                                <span><Plus /></span> <span>Add Product</span>
                            </div>
                            <span className='text-[#484848] text-[16px] font-medium'>Total Amount</span>

                        </div>
                        <span className='w-full text-end text-[#1A1A1A] text-[20px] font-semibold'>
                            NGN, 100,0000,000
                        </span>
                        <button className='bg-primary_blue  text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]' onClick={onClose} >
                            Create LPO
                        </button>
                    </form>
                </div>
            </div>
            {/* Modal */}
        </div>
    )
}
const Select = ({ label, options = [] }) => (
    <label className="block text-sm font-medium text-[#1A1A1A] w-full">
        {label}
        <select className=' bg-transparent rounded-lg h-[48px] p-4 flex items-center outline-none w-full'>
            <option>Select {label}</option>
            {options.map((opt, idx) => (
                <option key={idx}>{opt}</option>
            ))}
        </select>
    </label>
);
export default CreateLpoModal
