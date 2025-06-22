import { ArrowBigLeft, ArrowLeft, ArrowLeftIcon, X } from 'lucide-react';

const TaskNotesModal = ({ onCloseModal }) => {
    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center gap-5'>
                    <button onClick={onCloseModal}>
                        <ArrowLeftIcon className="text-gray-500 hover:text-black" />
                    </button>
                    <span className='text[#1A1A1A] font-semibold text-[20px] text-start w-full'>All Task Notes </span>

                </div>

                <div className=" py-4 rounded-md flex flex-col gap-5">

                    <div>
                        <span className='text-[#A3A3A3] font-medium text-[14px]'>12, Feb 2024</span>
                        <div className='text-[#484848] font-medium text-[16px]'>So sir they changed their sales director, so the communication channel we had, has been changed, so i  am working on a new re-communication strategy which the new manager  </div>
                    </div>
                    <div>
                        <span className='text-[#A3A3A3] font-medium text-[14px]'>12, Feb 2024</span>
                        <div className='text-[#484848] font-medium text-[16px]'>So sir they changed their sales director, so the communication channel we had, has been changed, so i  am working on a new re-communication strategy which the new manager  </div>
                    </div>

                </div>

            </div>
            {/* Modal */}
            {/* {isModalOpen && <QrCodeModal onCloseModal={handleModalToggle}/>}
            {isBarModalOpen && <BarCodeModal onCloseModal={handleBarModalToggle} />} */}
        </div>
    )
}

export default TaskNotesModal
