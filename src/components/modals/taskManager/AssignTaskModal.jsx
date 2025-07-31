import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import instance from '../../../utils/axiosInstance';

const AssignTaskModal = ({ onClose, onSuccess }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await instance.get('users');
        setEmployees(res.data.data.data); // Adjust if API response differs
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    getEmployees();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        user: selectedEmployee,
        title,
        description,
        dueDate,
      };
      await instance.post("task/create", payload);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Task creation failed:", error);
      // Optionally show toast/snackbar here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className='flex items-center justify-between'>
          <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Create a Task</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form className='flex flex-col gap-5 mt-5' onSubmit={handleCreateTask}>
          <label className='font-medium text-[14px] text-[#1A1A1A]'>
            Select Employee
            <select
              className="mt-1 bg-[#F5F5F5] rounded-lg h-[48px] px-4 text-sm outline-none w-full"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
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

          <label className='font-medium text-[14px] text-[#1A1A1A]'>
            Title of Task
            <input
              type="text"
              placeholder='Title of Task'
              className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] px-4 text-sm outline-none w-full'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label className='font-medium text-[14px] text-[#1A1A1A]'>
            Description
            <textarea
              rows="3"
              placeholder='Description'
              className='mt-1 bg-[#F5F5F5] rounded-lg px-4 py-2 text-sm outline-none w-full resize-none'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label className='font-medium text-[14px] text-[#1A1A1A]'>
            Due Date
            <input
              type='datetime-local'
              className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] px-4 text-sm outline-none w-full'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>

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
                Creating Task...
              </>
            ) : (
              'Create Task'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTaskModal;
