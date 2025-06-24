import { Plus, X } from 'lucide-react'
import React from 'react'
import SearchableSelect from '../../SearchableSelect'

const CreateLpoModal = ({ onClose }) => {
    const handleSelect = (e) => {
        e.preventDefault()
        // console.log('Selected:', value);
    };

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Create a Task</h2>
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
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                                <input type="text" placeholder='Select Lead Name' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
                            </div>
                        </label>
                        <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Select Product
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                                <SearchableSelect
                                    options={['Peak Milk Powdered', 'Matty Minny', 'Josh Sam', 'Abby Micheal', 'Lisa Tran']}
                                    onChange={handleSelect}
                                />
                            </div>
                        </label>

                        <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Select Payment Terms
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                                <SearchableSelect
                                    options={['Peak Milk Powdered', 'Matty Minny', 'Josh Sam', 'Abby Micheal', 'Lisa Tran']}
                                    onChange={handleSelect}
                                />
                            </div>
                        </label>
                        <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Qty
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                                <SearchableSelect
                                    options={['Peak Milk Powdered', 'Matty Minny', 'Josh Sam', 'Abby Micheal', 'Lisa Tran']}
                                    onChange={handleSelect}
                                />
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

export default CreateLpoModal
