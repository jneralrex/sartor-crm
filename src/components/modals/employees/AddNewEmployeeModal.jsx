import { X } from 'lucide-react';
import React, { useState } from 'react';
import EmployeeModuleModals from './EmployeeModuleModals';
import { useAuth } from '../../../context/AuthContext';
import instance from '../../../utils/axiosInstance';

// const AddNewEmployeeModal = ({ onClose }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [snackbar, setSnackbar] = useState(null);
//     const [addNewEmployeeDetails, setAddNewEmployeeDetails] = useState({
//           fullName: "",
//     address: "",
//     email: "",
//     phone: "",
//     role: "",
//     userManagement: "",
//     lpo: "",
//     payment: "",
//     sales: "",
//     clg: "",
//     workflow: ""
//     });
//     const VITE_API_URL = import.meta.env.VITE_BASE_URL;

//     const handleModalToggle = () => {
//         setIsModalOpen((prev) => !prev);
//     };

//     const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`${VITE_API_URL}create/employee`, addNewEmployeeDetails, {
//         headers: {
//           's-token': token,
//         },
//       });

//         console.log(res)

//        if (res.status === 200) {
//                 handleModalToggle(true);

      
//     //     setSnackbar({
//     //       type: 'success',
//     //       message: (
//     //         <span className="flex items-center gap-2">
//     //           <Check className="w-4 h-4" />
//     //           Login successful!
//     //         </span>
//     //       ),
//     //     });
//     //     setTimeout(() => {
//     //       setSnackbar(null);
//     //       navigate('/overview');
//     //     }, 1500);
//       } else {
//     //     setSnackbar({
//     //       type: 'error',
//     //       message: (
//     //         <span className="flex items-center gap-2">
//     //           <OctagonAlert className="w-4 h-4" />
//     //           {res.data.message || 'Login failed. An Error occurred.'}
//     //         </span>
//     //       ),
//     //     });
//             handleModalToggle(false);

//        }
//     } catch (error) {
//     //   setSnackbar({
//     //     type: 'error',
//     //     message: (
//     //       <span className="flex items-center gap-2">
//     //         <OctagonAlert className="w-4 h-4" />
//     //         {error.response?.data?.message || 'Login failed. An Error occurred.'}
//     //       </span>
//     //     ),
//     //   });
//     // }

//     // setTimeout(() => setSnackbar(null), 5000);
//   };


//     return (
//         <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
//             {snackbar && (
//         <div className={`absolute top-5 right-5 px-4 py-3 rounded-md text-sm shadow-md 
//           ${snackbar.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}
//         `}>
//           {snackbar.message}
//         </div>
//       )}
//             <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
//                 <div className='flex items-center justify-between'>
//                     <div>
//                         <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Add A New Employee</h2>
//                     </div>
//                     <button
//                         onClick={onClose}
//                         className=""
//                     >
//                         <X />
//                     </button>
//                 </div>
//                 <div>

//                     <form action="" className='flex flex-col gap-5 mt-5'>
//                         <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Full Name
//                             <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
//                                 <input type="text" placeholder='Full Name' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
//                             </div>
//                         </label>
//                         <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Email Address
//                             <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
//                                 <input type="text" placeholder='Email Address' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
//                             </div>
//                         </label>
//                         <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Select Role
//                             <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
//                                 <Select options={['Med1', 'Med2']} />

//                             </div>
//                         </label>
//                         <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Employee's Phone Nmber
//                             <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
//                                 <input type="text" placeholder='Employee Phone Nmber' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
//                             </div>
//                         </label>
//                         <label htmlFor="" className='font-medium text-[14px] text-[#1A1A1A]'>Employee's Address
//                             <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
//                                 <input type="text" placeholder='Employee Address' className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full' />
//                             </div>
//                         </label>
//                         <button className='bg-primary_blue  text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]' onClick={handleSubmit}>
//                             Set up module
//                         </button>
//                     </form>
//                 </div>
//             </div>
//             {/* Modal */}
//             {isModalOpen && <EmployeeModuleModals onClose={handleModalToggle} />}
//         </div>
//     )
// }

// const Select = ({ label, options = [] }) => (
//     <label className="block text-sm font-medium text-[#1A1A1A] w-full">
//         {label}
//         <select className=' bg-transparent rounded-lg h-[48px] p-4 flex items-center outline-none w-full'>
//             <option>Select {label}</option>
//             {options.map((opt, idx) => (
//                 <option key={idx}>{opt}</option>
//             ))}
//         </select>
//     </label>
// );

// export default AddNewEmployeeModal


const roleOptions = [
  "Manager",
  "Admin",
  "Sales Rep",
  "Inventory Manager",
  "Merchandiser",
  "Employee",
];

const AddNewEmployeeModal = ({ onClose }) => {
      const { token } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState(null);
    const [addNewEmployeeDetails, setAddNewEmployeeDetails] = useState({
      fullName: "",
      address: "",
      email: "",
      phone: "",
      role: "",
      userManagement: false,
      lpo: false,
      payment: false,
      sales: false,
      clg: false,
      workflow: false
    });

    // Handle input changes
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
  e.preventDefault();
  try {
    const res = await instance.post("user/create", addNewEmployeeDetails);

    console.log("API response:", res);

    if (res.status === 200 || res.status === 201) {
      setSnackbar({
        type: 'success',
        message: (
          <span className="flex items-center gap-2">
            Employee created successfully!
          </span>
        ),
      });
      setTimeout(() => {
        setSnackbar(null);
        onClose();
      }, 1500);
    } else {
      setSnackbar({
        type: 'error',
        message: (
          <span className="flex items-center gap-2">
            {res.data.message || 'Failed to create employee.'}
          </span>
        ),
      });
      setTimeout(() => setSnackbar(null), 3000);
    }
  } catch (error) {
    console.log("API error:", error?.response || error);
    setSnackbar({
      type: 'error',
      message: (
        <span className="flex items-center gap-2">
          {error.response?.data?.message || 'Failed to create employee.'}
        </span>
      ),
    });
    setTimeout(() => setSnackbar(null), 3000);
  }
};

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            {snackbar && (
              <div className={`absolute top-5 right-5 px-4 py-3 rounded-md text-sm shadow-md 
                ${snackbar.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}
              `}>
                {snackbar.message}
              </div>
            )}
            <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Add A New Employee</h2>
                    </div>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div>
                    <form className='flex flex-col gap-5 mt-5' onSubmit={handleSubmit}>
                        <label className='font-medium text-[14px] text-[#1A1A1A]'>Full Name
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                                <input
                                  type="text"
                                  name="fullName"
                                  value={addNewEmployeeDetails.fullName}
                                  onChange={handleChange}
                                  placeholder='Full Name'
                                  className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full'
                                  required
                                />
                            </div>
                        </label>
                        <label className='font-medium text-[14px] text-[#1A1A1A]'>Email Address
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                                <input
                                  type="email"
                                  name="email"
                                  value={addNewEmployeeDetails.email}
                                  onChange={handleChange}
                                  placeholder='Email Address'
                                  className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full'
                                  required
                                />
                            </div>
                        </label>
                        <label className='font-medium text-[14px] text-[#1A1A1A]'>Select Role
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                                <select
                                  name="role"
                                  value={addNewEmployeeDetails.role}
                                  onChange={handleChange}
                                  className='bg-transparent rounded-lg h-[48px] p-4 flex items-center outline-none w-full'
                                  required
                                >
                                  <option value="">Select Role</option>
                                  {roleOptions.map((opt, idx) => (
                                    <option key={idx} value={opt}>{opt}</option>
                                  ))}
                                </select>
                            </div>
                        </label>
                        <label className='font-medium text-[14px] text-[#1A1A1A]'>Employee's Phone Number
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                                <input
                                  type="text"
                                  name="phone"
                                  value={addNewEmployeeDetails.phone}
                                  onChange={handleChange}
                                  placeholder='Employee Phone Number'
                                  className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full'
                                  required
                                />
                            </div>
                        </label>
                        <label className='font-medium text-[14px] text-[#1A1A1A]'>Employee's Address
                            <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center'>
                                <input
                                  type="text"
                                  name="address"
                                  value={addNewEmployeeDetails.address}
                                  onChange={handleChange}
                                  placeholder='Employee Address'
                                  className='outline-none bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-[#484848] w-full'
                                  required
                                />
                            </div>
                        </label>
                        {/* Add checkboxes for permissions if needed */}
                        <button className='bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]' type="submit">
                            Set up module
                        </button>
                    </form>
                </div>
            </div>
            {/* Modal */}
            {isModalOpen && <EmployeeModuleModals onClose={handleModalToggle} />}
        </div>
    )
}

export default AddNewEmployeeModal