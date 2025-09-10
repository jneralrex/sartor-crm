import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import EmployeeModuleModals from './EmployeeModuleModals';
import instance from '../../../utils/axiosInstance';
import { useToken } from '../../../store/authStore';

const role = [
  "Manager",
  "Sales Rep",
  "Inventory Manager",
  "Merchandiser",
  "Employee",
];

const userRoleOptions = [
  "admin",
  "user",
]

const AddNewEmployeeModal = ({ onClose, onSuccess, employeeToEdit = null }) => {
  const  token  = useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addNewEmployeeDetails, setAddNewEmployeeDetails] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
    role: "",
    userRole: "",
    password: "",
    userManagement: false,
    lpo: false,
    payment: false,
    sales: false,
    clg: false,
    workflow: false,
    paymentConfirmation: false,
    lpoWorkflow: false,
    delivery: false,
    performanceMonitoring: false,
    promotionalManagement: false,
    paymentHandling: false,
    fieldActivity: false,
    visit: false,
    lpoManagement: false,
    marketingResources: false,
    followUp: false,
    paymentVisibility: false,
  });

  useEffect(() => {
    if (employeeToEdit) {
      setAddNewEmployeeDetails((prev) => ({
        ...prev,
        fullName: employeeToEdit.fullName || '',
        address: employeeToEdit.address || '',
        email: employeeToEdit.email || '',
        phone: employeeToEdit.phone || '',
        role: employeeToEdit.role || '',
        userRole: employeeToEdit.userRole || '',
        password: '', 
        userManagement: employeeToEdit.userManagement || false,
        lpo: employeeToEdit.lpo || false,
        payment: employeeToEdit.payment || false,
        sales: employeeToEdit.sales || false,
        clg: employeeToEdit.clg || false,
        workflow: employeeToEdit.workflow || false,
        paymentConfirmation: employeeToEdit.paymentConfirmation || false,
        lpoWorkflow: employeeToEdit.lpoWorkflow || false,
        delivery: employeeToEdit.delivery || false,
        performanceMonitoring: employeeToEdit.performanceMonitoring || false,
        promotionalManagement: employeeToEdit.promotionalManagement || false,
        paymentHandling: employeeToEdit.paymentHandling || false,
        fieldActivity: employeeToEdit.fieldActivity || false,
        visit: employeeToEdit.visit || false,
        lpoManagement: employeeToEdit.lpoManagement || false,
        marketingResources: employeeToEdit.marketingResources || false,
        followUp: employeeToEdit.followUp || false,
        paymentVisibility: employeeToEdit.paymentVisibility || false,
      }));
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddNewEmployeeDetails(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // Only include fields that are true or required
      const filteredAccess = Object.fromEntries(
        Object.entries(addNewEmployeeDetails).filter(([key, value]) => {
          const coreFields = ['fullName', 'email', 'phone', 'address', 'role', 'userRole', 'password'];
          return coreFields.includes(key) || value === true;
        })
      );

      let res;
      if (employeeToEdit) {
        res = await instance.put(`/user/edit`, {
          id: employeeToEdit._id,
          ...filteredAccess,
        });
        setLoading(false);
      } else {
        res = await instance.post("/user/create", filteredAccess);
        setLoading(false);
      }

      if (res.status === 200 || res.status === 201) {
        const newEmployeeData = res.data?.data;

        setSnackbar({
          type: 'success',
          message: (
            <span className="flex items-center gap-2">
              {employeeToEdit ? "Employee updated successfully!" : "Employee created successfully!"}
            </span>
          ),
        });

        console.log(res);

        onSuccess(newEmployeeData);

        setTimeout(() => {
          setSnackbar(null);
          onClose();
        }, 1500);
      } else {
        throw new Error(res.data?.message || "Failed to save employee.");
      }
    } catch (error) {
      console.log("API error:", error?.response || error);
      setSnackbar({
        type: 'error',
        message: (
          <span className="flex items-center gap-2">
            {error.response?.data?.message || 'Failed to save employee.'}
          </span>
        ),
      });
      setTimeout(() => setSnackbar(null), 3000);
    }
    finally {
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
        <div className='flex items-center justify-between'>
          <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">
            {employeeToEdit ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form className='flex flex-col gap-5 mt-5' onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "fullName", type: "text", placeholder: "Full Name" },
            { label: "Email Address", name: "email", type: "email", placeholder: "Email Address" },
            { label: "Employee's Phone Number", name: "phone", type: "text", placeholder: "Employee Phone Number" },
            { label: "Employee's Address", name: "address", type: "text", placeholder: "Employee Address" },
            { label: "Password", name: "password", type: "password", placeholder: "Password" },

          ].map(({ label, name, type, placeholder }) => (
            <label key={name} className='font-medium text-[14px] text-[#1A1A1A]'>{label}
              <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                <input
                  type={type}
                  name={name}
                  value={addNewEmployeeDetails[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full'
                  required
                />
              </div>
            </label>
          ))}

          <label className='font-medium text-[14px] text-[#1A1A1A]'>Access Role (System Role)
            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
              <select
                name="role"
                value={addNewEmployeeDetails.role}
                onChange={handleChange}
                className='bg-transparent rounded-lg h-[48px] p-4 flex items-center outline-none w-full'
                required
              >
                <option value="">Select Access Role</option>
                {role.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </label>

          <label className='font-medium text-[14px] text-[#1A1A1A]'>Job Role (User Role)
            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
              <select
                name="role"
                value={addNewEmployeeDetails.role}
                onChange={handleChange}
                className='bg-transparent rounded-lg h-[48px] p-4 flex items-center outline-none w-full'
                required
              >
                <option value="">Select Job Role</option>
                {userRoleOptions.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
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
                {employeeToEdit ? "Updating Employee..." : "Creating Employee..."}
              </>
            ) : (
              employeeToEdit ? "Update Employee" : "Create Employee"
            )}
          </button>

        </form>
      </div>

      {isModalOpen && <EmployeeModuleModals onClose={handleModalToggle} />}
    </div>
  );
};

export default AddNewEmployeeModal;
