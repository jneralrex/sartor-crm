import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { useToken, useUserId } from '../../../store/authStore';
import instance from '../../../utils/axiosInstance';

const AddLeadModal = ({ onClose, onSuccess, leadId }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const token = useToken();
  const userId = useUserId();
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

  // Fetch lead details if editing
  useEffect(() => {
    if (leadId) {
      const fetchLead = async () => {
        setLoading(true);
        try {
          const res = await instance.get(`lead/${leadId}`);
          const lead = res.data.data; // lead is the object itself

          if (!lead) {
            throw new Error('Lead not found');
          }

          setAddLeads({
            name: lead.name || "",
            address: lead.address || "",
            email: lead.email || "",
            phone: lead.phone || "",
            state: lead.state || "",
            type: lead.type || "",
            stores: lead.stores || "",
            dealSize: lead.dealSize || "",
            status: lead.status || "",
            notes: lead.notes || "",  // your API response doesn't show notes, so might be empty
            contact: Array.isArray(lead.contacts) && lead.contacts.length > 0
              ? lead.contacts
              : [{ name: "", email: "", phone: "", role: "" }],
          });
        } catch (error) {
          console.error("Failed to fetch lead data:", error);
          setSnackbar({
            type: 'error',
            message: 'Failed to load lead data.',
          });
        } finally {
          setLoading(false);
        }
      };

      fetchLead();
    }
  }, [leadId]);


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

  const submitHandler = async (e) => {
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
      if (leadId) {
        // EDIT mode - PUT request
        const res = await instance.put(`lead/edit/${leadId}`, addLeads);
        setSnackbar({
          type: 'success',
          message: 'Lead updated successfully!',
        });
      } else {
        // ADD mode - POST request
        const res = await instance.post(`lead`, addLeads);
        setSnackbar({
          type: 'success',
          message: 'Lead created successfully!',
        });
      }

      setTimeout(() => {
        setSnackbar(null);
        onClose();
        onSuccess();
      }, 1500);
    } catch (error) {
      setSnackbar({
        type: 'error',
        message: error.response?.data?.message || (leadId ? 'Failed to update lead.' : 'Failed to create lead.'),
      });
      setTimeout(() => setSnackbar(null), 1500);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-[455px] h-[95vh] rounded-xl shadow-lg overflow-y-auto hide-scrollbar">
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#1A1A1A]">
            {leadId ? "Edit Lead" : "Add A New Lead"}
          </h2>
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
        <form className="px-6 py-4 space-y-4" onSubmit={submitHandler}>
          {activeTab === 'basic' && (
            <>
              <Input label="Company Name" name="name" value={addLeads.name} onChange={handleChange} />
              <Input label="Company Address" name="address" value={addLeads.address} onChange={handleChange} />
              <Input label="Company State" name="state" value={addLeads.state} onChange={handleChange} />
              <Input label="Company Email" name="email" value={addLeads.email} onChange={handleChange} />
              <Select
                label="Company Type"
                name="type"
                value={addLeads.type}
                onChange={handleChange}
                options={[
                  "Distributor / Wholesaler",
                  "Retailer (Supermarket / Store / Pharmacy)",
                  "Clinic / Hospital ",
                  "E-commerce",
                  "Food Service / Hospitality",
                ]}
              />
              <Input label="Number of Stores" name="stores" value={addLeads.stores} onChange={handleChange} />
              <Input label="Company Phone Number" name="phone" value={addLeads.phone} onChange={handleChange} />
              <Input label="Potential Deal Size (₦)" name="dealSize" value={addLeads.dealSize} onChange={handleChange} />
              <Select
                label="Select Status"
                name="status"
                value={addLeads.status}
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
              <Textarea label="Notes" name="notes" value={addLeads.notes} onChange={handleChange} />
            </>
          )}
          {activeTab === 'contact' && (
            <>
              {addLeads.contact.map((person, index) => (
                <div key={index} className="mb-6 border-b border-gray-200 pb-4 relative">

                  {/* Remove button */}
                  {addLeads.contact.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = addLeads.contact.filter((_, i) => i !== index);
                        setAddLeads({ ...addLeads, contact: updated });
                      }}
                      className="absolute top-0 right-0 text-red-500 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  )}

                  {/* Input fields for each contact */}
                  <Input
                    label="Contact Person"
                    name="name"
                    value={person.name}
                    onChange={(e) => handleContactChange(e, index)}
                  />
                  <Input
                    label="Email"
                    name="email"
                    value={person.email}
                    onChange={(e) => handleContactChange(e, index)}
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={person.phone}
                    onChange={(e) => handleContactChange(e, index)}
                  />
                  <Select
                    label="Role"
                    name="role"
                    value={person.role}
                    onChange={(e) => handleContactChange(e, index)}
                    options={[
                      "Owner / Founder",
                      "CEO / Managing Director",
                      "Chief Operating Officer (COO)",
                      "Chief Financial Officer (CFO) / Financial Officer",
                      "General Manager / Branch Manager",
                      "Procurement / Purchasing Manager",
                      "Sales / Marketing Manager",
                      "Store Manager / Supervisor",
                      "Superintendent Pharmacist / Pharmacist",
                      "Other (e.g., Matron, Doctor, Nurse, Secretary, Head Chef)",
                    ]}
                  />
                </div>
              ))}

              {/* Add new contact button */}
              <div
                className="text-[#3B82F6] flex justify-center items-center gap-2 text-sm cursor-pointer font-medium mt-4"
                onClick={() =>
                  setAddLeads({
                    ...addLeads,
                    contact: [
                      ...addLeads.contact,
                      { name: "", email: "", phone: "", role: "" },
                    ],
                  })
                }
              >
                <Plus size={16} />
                <span>Add Another Contact Person</span>
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
                {leadId ? 'Updating Lead...' : 'Submitting Lead...'}
              </>
            ) : (
              leadId ? 'Update Lead' : 'Submit Lead'
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


