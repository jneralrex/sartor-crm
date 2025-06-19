import { Check, TimerIcon, X } from 'lucide-react'
import { useState } from 'react';

const NotificationModal = ({ onClose }) => {

    const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

    const handleModalToggle = () => {
        setNotificationModalOpen((prev) => !prev);
    };

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[99]  md:justify-end">
            <div className="bg-primary_white p-6 shadow-lg max-w-[455px] h-[550px] md:h-[400px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <div className='text-center w-full md:text-start'>
                        <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Notification</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className=""
                    >
                        <X />
                    </button>
                </div>
                <div className='w-full flex flex-col gap-5'>


                        <div className='flex flex-col gap-2'>

                            <div className='flex gap-2 text-[#858D9D] text-[12px] items-center'>

                                <TimerIcon className='size-4' />
                                <span>1 min ago</span>
                            </div>

                            <span className='text-[#333843] font-medium text-[16px] '>Invoice Overdue</span>
                            <p className='font-normal text-[14px] text-[#858D9D]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem repellat quos modi accusamus error minima blanditiis cumque? Debitis, voluptatibus ex.</p>
                            <div className='w-full flex justify-end gap-2 items-center'>
                                <Check className='size-5'/> <span className='underline text-primary_blue'>Mark as Read</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>

                            <div className='flex gap-2 text-[#858D9D] text-[12px] items-center'>

                                <TimerIcon className='size-4' />
                                <span>2 hour ago</span>
                            </div>

                            <span className='text-[#333843] font-medium text-[16px] '>Order #30851 Has Been Shiped</span>
                            <p className='font-normal text-[14px] text-[#858D9D]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus vestibulum hendrerit. Nulla est diam.</p>
                             <div className='w-full flex justify-end gap-2 items-center'>
                                <Check className='size-5'/> <span className='underline text-primary_blue'>Mark as Read</span>
                            </div>
                        </div>


                    <div className='flex flex-col gap-2'>

                        <div className='flex gap-2 text-[#858D9D] text-[12px] items-center'>

                            <TimerIcon className='size-4' />
                            <span>1 day ago</span>
                        </div>

                        <span className='text-[#333843] font-medium text-[16px] '>Your Product “Logic Mouse” Out of Stock</span>
                        <p className='font-normal text-[14px] text-[#858D9D]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus vestibulum hendrerit. Nulla est diam.</p>

                    </div>
                    <div className='flex flex-col gap-2'>

                        <div className='flex gap-2 text-[#858D9D] text-[12px] items-center'>

                            <TimerIcon className='size-4' />
                            <span>1 min ago</span>
                        </div>

                        <span className='text-[#333843] font-medium text-[16px] '>Your Product “Imac 2021” Out of Stock</span>
                        <p className='font-normal text-[14px] text-[#858D9D]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus vestibulum hendrerit. Nulla est diam.</p>

                    </div>

                     <div className='w-full flex justify-start gap-2 items-center'>
                                <Check className='size-5'/> <span className='underline text-primary_blue'>Mark as Read</span>
                            </div>
                </div>
            </div>

        </div>
    )
}

export default NotificationModal
