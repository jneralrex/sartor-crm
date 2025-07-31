import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import instance from '../../../utils/axiosInstance';

const AddLeadModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null); 
  const [addLeads, setAddLeads] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    state: "",
    type: "",
    stores: "",
    dealSize: "",
    status: "",
    notes: "",
    contact: [
      {
        name: "",
        email: "",
        phone: "",
        role: "",
      },
    ],
  });

  const handleChange = (e) => {
    setAddLeads({ ...addLeads, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e, index) => {
    const updatedContacts = [...addLeads.contact];
    updatedContacts[index][e.target.name] = e.target.value;
    setAddLeads({ ...addLeads, contact: updatedContacts });
  };

  const validateFields = () => {
    const requiredFields = ['name', 'address', 'email', 'phone', 'state', 'type', 'stores', 'dealSize', 'status'];
    for (let field of requiredFields) {
      if (!addLeads[field]) return false;
    }

    const contact = addLeads.contact[0];
    const contactFields = ['name', 'email', 'phone', 'role'];
    for (let field of contactFields) {
      if (!contact[field]) return false;
    }

    return true;
  };


  const addLeadsHandler = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setSnackbar({
        type: 'error',
        message: 'Please fill all required fields.',
      });
      setTimeout(() => setSnackbar(null), 3000);
      return;
    }

    setLoading(true);

    try {
      const res = await instance.post(`lead`, addLeads);
      setSnackbar({
        type: 'success',
        message: 'Lead created successfully!',
      });
      setTimeout(() => {
        setSnackbar(null);
        onClose(); // ✅ close modal after delay
      }, 1500);
    } catch (error) {
      setSnackbar({
        type: 'error',
        message: error.response?.data?.message || 'Failed to create lead.',
      });
      setTimeout(() => setSnackbar(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  console.log(addLeads)

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
        <form className="px-6 py-4 space-y-4" onSubmit={addLeadsHandler}>
          {activeTab === 'basic' && (
            <>
              <Input label="Company Name" name="name" value={addLeads.name} onChange={handleChange} />
              <Input label="Company Address" name="address" value={addLeads.address} onChange={handleChange} />
              <Input label="Company State" name="state" value={addLeads.state} onChange={handleChange} />
              <Input label="Company Email" name="email" value={addLeads.email} onChange={handleChange} />
              <Select label="Company Type" name="type" value={addLeads.type} onChange={handleChange} options={["Pharmacy  ", "Clinic"]} />
              <Input label="Number of Stores" name="stores" value={addLeads.stores} onChange={handleChange} />
              <Input label="Company Phone Number" name="phone" value={addLeads.phone} onChange={handleChange} />
              <Input label="Potential Deal Size (₦)" name="dealSize" value={addLeads.dealSize} onChange={handleChange} />
              <Select label="Select Status" name="status" value={addLeads.status} onChange={handleChange} options={["Contacted  ", "Order Fulfilled", "Closed Lost", "Follow Up", "Qualified", "Interested", "Hold", "In-Negotiations", "LPO Generated", "Closed Won", "Payment Confirmed"]} />
              <Textarea label="Notes" name="notes" value={addLeads.notes} onChange={handleChange} />
            </>
          )}

          {activeTab === 'contact' && (
            <>
              <Input label="Contact Person" name="name" value={addLeads.contact[0].name} onChange={(e) => handleContactChange(e, 0)} />
              <Input label="Email" name="email" value={addLeads.contact[0].email} onChange={(e) => handleContactChange(e, 0)} />
              <Input label="Phone Number" name="phone" value={addLeads.contact[0].phone} onChange={(e) => handleContactChange(e, 0)} />
              <Select label="Role" name="role" value={addLeads.contact[0].role} onChange={(e) => handleContactChange(e, 0)} options={['COO', 'CEO', 'Manager']} />
              <div className="text-[#A3A3A3] flex justify-center items-center gap-2 text-sm cursor-pointer">
                <Plus size={16} />
                <span>Add Contact Person 2</span>
              </div>
            </>
          )}

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
                Submitting Leads...
              </>
            ) : (
              '  Submit Leads'
            )}
          </button>
        </form>
      </div>
        {snackbar && (
        <div className={`absolute top-5 right-5 px-4 py-3 rounded-md text-sm shadow-md z-50 
          ${snackbar.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
          {snackbar.message}
        </div>
      )}
    </div>
  );
};


const Input = ({ label, name, value, onChange }) => (
  <label className="block text-sm font-medium text-[#1A1A1A]">
    {label}
    <div className="mt-1 bg-[#F5F5F5] rounded-lg h-[48px] flex items-center px-4">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full bg-transparent outline-none text-sm placeholder:text-[#484848]"
      />
    </div>
  </label>
);

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

const Textarea = ({ label, name, value, onChange }) => (
  <label className="block text-sm font-medium text-[#1A1A1A]">
    {label}
    <textarea
      rows={3}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="mt-1 w-full bg-[#F5F5F5] rounded-lg px-4 py-2 text-sm text-[#484848] outline-none"
    />
  </label>
);
export default AddLeadModal;