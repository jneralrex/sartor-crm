import { useState } from 'react';
import { X } from 'lucide-react';
import instance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const STATUS_OPTIONS = [
  'Pending',
  'Due',
  'Assigned',
  'Unconfirmed',
  'Completed',
  'Received',
  'Overdue',
  'To-Do',
  'Confirmed'
];

const UpdateTaskStatusModal = ({ taskId, currentStatus, onClose, onSuccess }) => {
  const [status, setStatus] = useState(currentStatus || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const handleUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const res = await instance.put('/task/status/update', {
      status,
      id: taskId,
    });

    console.log('Status updated:', res);

    toast.success('Status updated successfully!');

    onSuccess?.(res.data.data); // <-- this already closes modal in parent
    // DO NOT call onClose() again here

  } catch (err) {
    console.error('Error updating status:', err);
    setError('Failed to update status. Please try again.');
    toast.error('Failed to update status');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[400px] rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Update Task Status</h2>
          <button onClick={onClose}><X className="text-gray-500 hover:text-black" /></button>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-5">
          <label className="font-medium text-sm text-[#1A1A1A]">
            Select Status
            <select
              className="mt-1 bg-[#F5F5F5] rounded-lg h-[48px] px-4 text-sm outline-none w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">-- Select Status --</option>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold h-[48px] flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Updating...' : 'Update Status'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskStatusModal;
