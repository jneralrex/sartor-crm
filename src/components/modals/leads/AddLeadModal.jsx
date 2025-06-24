import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const AddLeadModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-[455px] h-[95vh] rounded-xl shadow-lg overflow-y-auto hide-scrollbar">
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#1A1A1A]">Add A New Lead</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 mt-4">
          <button
            className={`pb-2 mr-6 font-medium ${activeTab === 'basic' ? 'text-[#1A1A1A]' : 'text-gray-400'}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button
            className={`pb-2 font-medium ${activeTab === 'contact' ? 'text-[#1A1A1A]' : 'text-gray-400'}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Person
          </button>
        </div>

        {/* Form Body */}
        <form className="px-6 py-4 space-y-4">
          {activeTab === 'basic' && (
            <>
              <Input label="Company Name" placeholder="Company Name" />
              <Input label="Company Address (Head Office)" placeholder="Company Address" />
              <Input label="Company State" placeholder="Company State" />
              <Input label="Company Email" placeholder="Company Email" />
              <Select label="Company Type" options={['Retailer', 'Wholesaler']} />
              <Input label="Number of Stores" placeholder="Number of Stores" />
              <Input label="Potential Deal Size (₦)" placeholder="e.g. 1000000" />
              <Select label="Select Status" options={['Interested', 'Negotiating', 'Closed']} />
              <Textarea label="Notes" placeholder="Enter your notes" />
              <button
                type="submit"
                className="w-full py-3 bg-primary_blue text-white font-semibold rounded-lg"
              >
                Add Lead
              </button>
            </>
          )}

          {activeTab === 'contact' && (
            <>
              <Input label="Contact Person" placeholder="Full Name" />
              <Input label="Contact Person Email" placeholder="Email" />
              <Input label="Contact Person Phone Number" placeholder="Phone Number" />
              <Select label="Contact Person Role" options={['Manager', 'Owner', 'Sales Rep']} />
              <div className="text-[#A3A3A3] flex justify-center items-center gap-2 text-sm cursor-pointer">
                <Plus size={16} />
                <span>Add Contact Person 2</span>
              </div>
                <button
                type="submit"
                className="w-full py-3 bg-primary_blue text-white font-semibold rounded-lg"
              >
                Add Lead
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, placeholder }) => (
  <label className="block text-sm font-medium text-[#1A1A1A]">
    {label}
    <div className="mt-1 bg-[#F5F5F5] rounded-lg h-[48px] flex items-center px-4">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm placeholder:text-[#484848]"
      />
    </div>
  </label>
);

// Reusable Select Component
const Select = ({ label, options = [] }) => (
  <label className="block text-sm font-medium text-[#1A1A1A]">
    {label}
    <select className="mt-1 w-full h-[48px] bg-[#F5F5F5] rounded-lg px-4 text-sm text-[#484848] outline-none">
      <option>Select {label}</option>
      {options.map((opt, idx) => (
        <option key={idx}>{opt}</option>
      ))}
    </select>
  </label>
);

// Reusable Textarea
const Textarea = ({ label, placeholder }) => (
  <label className="block text-sm font-medium text-[#1A1A1A]">
    {label}
    <textarea
      rows={3}
      placeholder={placeholder}
      className="mt-1 w-full bg-[#F5F5F5] rounded-lg px-4 py-2 text-sm text-[#484848] outline-none"
    />
  </label>
);

export default AddLeadModal;
