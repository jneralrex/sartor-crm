import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import instance from '../../../utils/axiosInstance';

const AssignTaskModal = ({ onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const getEmployees = async () => {
    try {
      const res = await instance.get('users');
      console.log(res);
      setEmployees(res.data.data); // ✅ adjust based on your actual API shape
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user: selectedEmployee,
        title,
        description,
        dueDate,
      };
      console.log("Payload sent:", payload);
      const res = await instance.post("task/create", payload);
      
      console.log("Task created:", res.data);
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Task creation failed:", error);
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
          {/* Select Employee */}
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

          {/* Title */}
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

          {/* Description */}
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

          {/* Due Date */}
          <label className='font-medium text-[14px] text-[#1A1A1A]'>
            Due Date
            <input
              type="date"
              className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] px-4 text-sm outline-none w-full'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className='bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]'
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTaskModal;
