import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import instance from '../utils/axiosInstance';
import { useUserId } from '../store/authStore';

const roleOptions = [
  "Manager",
  "Admin",
  "Sales Rep",
  "Inventory Manager",
  "Merchandiser",
  "Employee",
];

const EditUserProfileModal = ({ onClose, userData, onUserUpdate }) => {
  const userId = useUserId(); // Custom hook to get user ID
  const [formData, setFormData] = useState({
    id: userId,
    fullName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    image: "",
    userManagement: false,
    lpo: false,
    payment: false,
    sales: false,
    clg: false,
    workflow: false,
  });

  const [snackbar, setSnackbar] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (userData) {
      setFormData({
        id: userId || "", // changed from _id to id
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        role: userData.role || "",
        image: userData.image || "",
        userManagement: userData.userManagement || false,
        lpo: userData.lpo || false,
        payment: userData.payment || false, // fixed: lowercase + removed `|| true`
        sales: userData.sales || false,
        clg: userData.clg || false,
        workflow: userData.workflow || false,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { id, ...rest } = formData;
      const res = await instance.put('user/edit', { id, ...rest });
      console.log(res)
      if (res.data.status) {
        const updatedUser = res.data?.data;

        setSnackbar({
          type: 'success',
          message: <span>{res?.data?.message || "Something went wrong, try again!"}</span>,
        });

        setTimeout(() => {
          setSnackbar(null);
          onUserUpdate && onUserUpdate(updatedUser); // Pass up
          onClose(); // Close modal
        }, 2000);
      }
    } catch (error) {

      setSnackbar({
        type: 'error',
        message: <span>{error.message || 'Failed to update profile.'}</span>,
      });
      setTimeout(() => setSnackbar(null), 3000);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      {snackbar && (
        <div className={`absolute top-5 right-5 px-4 py-3 rounded-md text-sm shadow-md 
          ${snackbar.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {snackbar.message}
        </div>
      )}

      <div className="bg-white p-6 shadow-lg w-[90%] max-w-[450px] rounded-lg overflow-y-auto max-h-[90vh] hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {formData.image && (
          <div className="mb-4 text-center">
            <img src={formData.image} alt="Profile" className="w-20 h-20 rounded-full mx-auto" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-2 py-1"
            >
              <option value="">Select Role</option>
              {roleOptions.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <button
              type="button"
              className="bg-gray-400 text-white py-2 font-semibold cursor-not-allowed"
              disabled
            >
              Updating...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary_blue text-white py-2 font-semibold hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          )}

        </form>
      </div>
    </div>
  );
};

export default EditUserProfileModal;
