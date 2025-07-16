import { Plus, X, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import instance from '../../../utils/axiosInstance';
import { useAuth } from '../../../context/AuthContext';

const lpoStatus = [
    "Delivered", "In Transit", "Processing", "Cancelled", "Sorted", "Received", "Overdue", "To-Do", "Confirmed"
];

const EditLpoModal = ({ lpo, onClose, onSuccess }) => {
    const { token } = useAuth();
   

    
    const [status, setStatusToEdit] = useState({ status: '' });
    

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            status: status.status,
        };

        try {
            const res = await instance.put(`lpo/edit/${lpo._id}`, payload);
            console.log("Updated:", res.data);
            onSuccess?.(res.data.data);
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    console.log(status);

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Edit LPO</h2>
                    <button onClick={onClose}><X /></button>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>
                    {/* Lead Selection */}
               

                    {/* Terms Selection */}
                    <label className='font-medium text-[14px] text-[#1A1A1A]'>
                        Select Status
                        <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                           <select
  value={status.status}
  onChange={e => setStatusToEdit({ status: e.target.value })}
                                  className="bg-transparent outline-none w-full text-sm"

>

                                <option value="">Select Status</option>
                                {lpoStatus.map(stat => (
                                    <option key={stat}>{stat}</option>
                                ))}
                            </select>
                        </div>
                    </label>

                    <button
                        type="submit"
                        className='bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]'
                    >
                        Update LPO
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditLpoModal;
