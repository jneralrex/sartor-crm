import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import instance from '../../../utils/axiosInstance';
import { useToken } from '../../../store/authStore';

const EditLeadStatus = ({ leadId, onClose, onSuccess }) => {
    const token = useToken();
    const [loading, setLoading] = useState(false);

    const [status, setStatusToEdit] = useState({ status: '' });

    // Pre-fill current status when modal opens
    useEffect(() => {
        if (leadId?.status) {
            setStatusToEdit({ status: leadId.status });
        }
    }, [leadId]);

    // Handle select input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStatusToEdit(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            status: status.status,
            id: leadId,
        };


        try {
            const res = await instance.put(`/lead/status/update`, payload);
            console.log("Updated:", res.data);

            onSuccess?.(res.data.data.updatedLead);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Edit Status</h2>
                    <button onClick={onClose}><X /></button>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>

                    <Select
                        label="Select Status"
                        name="status"
                        value={status.status}
                        onChange={handleChange}
                        options={[
                            "Contacted",
                            "Order Fulfilled",
                            "Closed Lost",
                            "Follow Up",
                            "Qualified",
                            "Interested",
                            "Hold",
                            "In-Negotiations",
                            "LPO Generated",
                            "Closed Won",
                            "Payment Confirmed",
                        ]}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold h-[52px] flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Updating LPO...
                            </>
                        ) : (
                            'Update LPO'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditLeadStatus;

const Select = ({ label, name, value, onChange, options = [] }) => (
    <label className="block text-sm font-medium text-[#1A1A1A]">
        {label}
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 w-full h-[48px] bg-[#F5F5F5] rounded-lg px-4 text-sm text-[#484848] outline-none"
        >
            <option value="">Select {label}</option>
            {options.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
            ))}
        </select>
    </label>
);
