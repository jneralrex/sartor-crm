import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import instance from '../../../utils/axiosInstance';

const EditTaskModal = ({ task, onClose, onSuccess }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id:'',
    adminID: '',
    title: '',
    description: '',
    dueDate: '',
  });

  // Fetch all employees
  const getEmployees = async () => {
    try {
      const res = await instance.get('users');
      setEmployees(res.data.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Populate task data
  useEffect(() => {
    getEmployees();

    if (task) {
      setFormData({
        id: task._id || '',
        adminID: task?.user?._id || '',
        title: task?.title || task?.taskName || '',
        description: task?.description || task?.task || '',
        dueDate: task?.dueDate
          ? new Date(task.dueDate).toISOString().slice(0, 16)
          : '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: formData.id,
        adminID: formData.adminID,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
      };

      const res = await instance.put(`/task/edit/`, payload);
        console.log('Task updated:', res.data);
      onSuccess(res.data.data[0]); // Update state in TaskManager
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  console.log('Form Data:', formData);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className='flex items-center justify-between'>
          <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Edit Task</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form className='flex flex-col gap-5 mt-5' onSubmit={handleSubmit}>
          {/* Select Employee */}
          <label className='font-medium text-[14px] text-[#1A1A1A]'>
            Select Employee
            <select
              className="mt-1 bg-[#F5F5F5] rounded-lg h-[48px] px-4 text-sm outline-none w-full"
              name="user"
              value={formData.adminID}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Employee --</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>
                  {emp.fullName}
                </option>
              ))}
            </select>
          </label>

          {/* Title */}
          <label className='font-medium text-[14px] text-[#1A1A1A]'>
            Title of Task
            <input
              type="text"
              name="title"
              placeholder='Title of Task'
              className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] px-4 text-sm outline-none w-full'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          {/* Description */}
          <label className='font-medium text-[14px] text-[#1A1A1A]'>
            Description
            <textarea
              name="description"
              rows="3"
              placeholder='Description'
              className='mt-1 bg-[#F5F5F5] rounded-lg px-4 py-2 text-sm outline-none w-full resize-none'
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>

          {/* Due Date */}
          <label className='font-medium text-[14px] text-[#1A1A1A]'>
            Due Date
            <input
              type='datetime-local'
              name="dueDate"
              className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] px-4 text-sm outline-none w-full'
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className='bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]'
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
