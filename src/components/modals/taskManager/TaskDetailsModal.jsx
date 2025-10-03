import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import TaskNotesModal from './TaskNotesModal';
import AssignToNewEmployee from './AssignToNewEmployee';
import ReassignTaskModal from './ReassignTaskModal';
import InvoiceModal from './InvoiceModal';
import { useRole, useToken } from '../../../store/authStore';
import instance from '../../../utils/axiosInstance';
import UpdateTaskStatusModal from './UpdateTaskStatusModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskDetailsModal = ({ onClose, taskId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isReAssignModalOpen, setIsReAssignModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [singleTask, setSingleTask] = useState({});
    const [makeTaskComment, setMakeTaskComment] = useState({
        comment: '',
        taskId: taskId
    });

    const [noteFromEmployee, setNoteFromEmployee] = useState({})
    const [showConfirmComplete, setShowConfirmComplete] = useState(false);


    const token = useToken();
    const role = useRole();

    const isSalesRep = role === 'Sales Rep';
    const isSuperAdmin = role === 'Super-Admin';

    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    const toggleStatusModal = () => setIsStatusModalOpen((prev) => !prev);


    const handleMarkAsCompleted = async () => {
        try {
            const res = await instance.post('/task/status/update', {
                status: 'Completed',
                id: singleTask._id,
            });

            if (res.status === 200) {
                toast.success('Task marked as completed!');
                setSingleTask(prev => ({ ...prev, status: 'Completed' }));
            } else {
                toast.error('Failed to mark as completed.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setShowConfirmComplete(false);
        }
    };


    useEffect(() => {
        if (!taskId) return;

        const getSingleTask = async () => {
            try {
                const res = await instance.get(`task/${taskId}`);
                console.log(res);
                setSingleTask(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getSingleTask();
    }, [token, taskId]);


    useEffect(() => {
        if (taskId) return;
        const getNoteFromEmployee = async () => {
            try {
                const res = await instance.get(`task/comment/${taskId}`);
                setNoteFromEmployee(res)
            } catch (error) {
                console.log(error);

            }
        }
        getNoteFromEmployee();
    }, [token, taskId]);


    const submitComment = async (e) => {
        e.preventDefault();
        try {
            const res = await instance.post('task/comment', makeTaskComment);
            console.log(res);
            setMakeTaskComment({ comment: '', taskId: taskId });
            toast.success('Comment added successfully!');
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            toast.error('Failed to add comment. Please try again.');
        }
    };

    const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
    };
    const handleAssignModalToggle = () => {
        setIsAssignModalOpen((prev) => !prev);
    };
    const handleReAssignModalToggle = () => {
        setIsReAssignModalOpen((prev) => !prev);
    };
    const handleInvoiceModalToggle = () => {
        setIsInvoiceModalOpen((prev) => !prev);
    };

    console.log(noteFromEmployee, "notes")
    console.log(taskId)

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <span className='text-[#1A1A1A] font-semibold text-[20px]'>Task Details</span>
                    <button onClick={onClose}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>

                <div className="py-4 rounded-md grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">
                    {/* Fields visible to all */}
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Title
                        <span className='text-[#484848] mt-2 w-[150px]'>
                            {singleTask.title || "-"}
                        </span>
                    </label>

                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Date Created
                        <span className='text-[#484848] mt-2'>
                            {new Date(singleTask.creationDateTime).toLocaleDateString()}
                        </span>
                    </label>

                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Due Date
                        <span className='text-[#484848] mt-2'>
                            {singleTask.dueDate || "-"}
                        </span>
                    </label>

                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Status
                        <span
                            className={`mt-2 ${!isSalesRep ? 'underline text-primary_blue cursor-pointer' : 'text-[#484848]'}`}
                            onClick={!isSalesRep ? toggleStatusModal : undefined}
                        >
                            {singleTask.status || "-"}
                        </span>
                    </label>


                    {/* Fields hidden from Sales Rep */}
                    {!isSalesRep && (
                        <>
                            <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                Phone Number
                                <span className='text-[#484848] mt-2'>
                                    {singleTask.user?.phone || "-"}
                                </span>
                            </label>

                            <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                Employee's Name
                                <span className='text-[#484848] mt-2'>
                                    {singleTask.user?.fullName || "-"}
                                </span>
                            </label>

                            <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                Email Address
                                <span className='text-[#484848] mt-2'>
                                    {singleTask.user?.email || "-"}
                                </span>
                            </label>

                            <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                Role
                                <span className='text-[#484848] mt-2'>
                                    {singleTask.user?.role || "-"}
                                </span>
                            </label>

                            <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                Payment Doc
                                <span className='text-[#484848] underline mt-2'>
                                    View Doc
                                </span>
                            </label>

                            <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                                Payment Terms
                                <span className='text-[#484848] mt-2'>
                                    Payment On Delivery
                                </span>
                            </label>
                        </>
                    )}
                </div>

                {/* Description always visible */}
                <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                    Description
                    <span className='text-[#484848] mt-2'>
                        {singleTask.description || "-"}
                    </span>
                </label>

                {/* Notes input hidden from Sales Rep */}
                {!isSuperAdmin && (
                    <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
                        Add Notes
                        <textarea
                            name="comment"
                            value={makeTaskComment.comment}
                            onChange={(e) =>
                                setMakeTaskComment({
                                    ...makeTaskComment,
                                    comment: e.target.value,
                                })
                            }
                            cols="30"
                            rows="4"
                            className='border border-[#E4E4E4] rounded-lg p-2 mt-2 resize-none'
                            placeholder='Enter your notes here'
                        ></textarea>
                    </label>
                )}

                {/* Buttons only for non-sales-reps */}
                {!isSalesRep && (
                    <div className='flex flex-wrap gap-2 mt-4'>
                        <button
                            className="bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]"
                            onClick={handleReAssignModalToggle}
                        >
                            Reassign
                        </button>

                        {/* <button
                            className="bg-primary_grey text-[#484848] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]"
                            onClick={handleAssignModalToggle}
                        >
                            Assign to Employee
                        </button> */}

                    </div>
                )}


                {!isSuperAdmin && (
                    <div className='flex gap-2'>

                        <button
                            className="bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]"
                            onClick={() => setShowConfirmComplete(true)}
                        >
                            Mark as Completed
                        </button>

                        <button className="bg-primary_grey text-[#484848] w-full py-3 rounded-lg text-[16px] font-semibold max-w-[183.5px]"
                            onClick={submitComment}
                            disabled={!makeTaskComment.comment.trim()} >
                            Add Comment
                        </button>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showConfirmComplete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Confirm Completion</h2>
                            <button onClick={() => setShowConfirmComplete(false)}>
                                <X className="text-gray-500 hover:text-black" />
                            </button>
                        </div>
                        <p className="text-gray-700 mb-6">Are you sure, this task is completed?. This action can’t be reversed</p>
                        <div className="flex justify-end gap-3">
                             <button
                                className="bg-primary_blue text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleMarkAsCompleted}
                            >
                                Yes, Proceed
                            </button>
                            <button
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                                onClick={() => setShowConfirmComplete(false)}
                            >
                                No, Cancel
                            </button>
                           
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && <TaskNotesModal onCloseModal={handleModalToggle} />}
            {isAssignModalOpen && <AssignToNewEmployee onClose={handleAssignModalToggle} />}
            {isReAssignModalOpen && <ReassignTaskModal onClose={handleReAssignModalToggle} />}
            {isInvoiceModalOpen && <InvoiceModal onClose={handleInvoiceModalToggle} />}
            {isStatusModalOpen && (
                <UpdateTaskStatusModal
                    taskId={singleTask._id}
                    currentStatus={singleTask.status}
                    onClose={toggleStatusModal}
                    onSuccess={(updatedTask) => setSingleTask(updatedTask)}
                />
            )}

        </div>
    );
};

export default TaskDetailsModal;
