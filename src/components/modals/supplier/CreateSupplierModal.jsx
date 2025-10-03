import { X } from 'lucide-react';
import React, { useState } from 'react';
import instance from '../../../utils/axiosInstance';
import { useToken } from '../../../store/authStore';

const CreateSupplierModal = ({ onClose, onSuccess }) => {
  const token = useToken();
  const [snackbar, setSnackbar] = useState(null);
  const [loading, setLoading] = useState(false);

  const [supplierData, setSupplierData] = useState({
    name: '',
    product: '',
    contactName: '',
    contactRole: '',
    contactNumber: '',
    phone: '',
    address: '',
    email: '',
    branch: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await instance.post('/supplier', supplierData);
    console.log(res);

    if (res.data.status === true || res.data.message === "Supplier created successfully") {
      setSnackbar({
        type: 'success',
        message: 'Supplier created successfully!',
      });

      // Optional callback
      if (onSuccess) onSuccess(res.data?.data);

      // Clear form
      setSupplierData({
        name: '',
        product: '',
        contactName: '',
        contactRole: '',
        contactNumber: '',
        phone: '',
        address: '',
        email: '',
        branch: ''
      });

      // Close modal after 1.5s
      setTimeout(() => {
        setSnackbar(null);
        onClose();
      }, 1500);
    } else {
      throw new Error('Failed to create supplier');
    }
  } catch (error) {
    console.error(error);
    setSnackbar({
      type: 'error',
      message: error.response?.data?.message || 'An error occurred',
    });
    setTimeout(() => setSnackbar(null), 3000);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      {snackbar && (
        <div className={`absolute top-5 right-5 px-4 py-3 rounded-md text-sm shadow-md 
          ${snackbar.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
          {snackbar.message}
        </div>
      )}

      <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-semibold text-[#1A1A1A]">
            Add New Supplier
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
          {[
            { label: 'Supplier Name', name: 'name', placeholder: 'Acme Supplies Ltd.' },
            { label: 'Product', name: 'product', placeholder: 'Office Furniture' },
            { label: 'Contact Name', name: 'contactName', placeholder: 'Jane Doe' },
            { label: 'Contact Role', name: 'contactRole', placeholder: 'Procurement Manager' },
            { label: 'Contact Number', name: 'contactNumber', placeholder: '+2348012345678' },
            { label: 'Company Phone', name: 'phone', placeholder: '+2348098765432' },
            { label: 'Email', name: 'email', placeholder: 'jane.doe@acmesupplies.com' },
            { label: 'Address', name: 'address', placeholder: '23 Industrial Layout, Lagos' },
            { label: 'Branch', name: 'branch', placeholder: 'Lagos Head Office' },
          ].map(({ label, name, placeholder }) => (
            <label key={name} className="text-[14px] text-[#1A1A1A] font-medium">
              {label}
              <div className="mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center">
                <input
                  type="text"
                  name={name}
                  value={supplierData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="outline-none bg-transparent w-full placeholder:text-xs placeholder:font-medium placeholder:text-[#484848]"
                />
              </div>
            </label>
          ))}

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
                Creating...
              </>
            ) : (
              'Create Supplier'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSupplierModal;
