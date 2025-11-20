import { useState } from 'react';
import instance from '../../../utils/axiosInstance';
import useAuthStore from '../../../store/authStore';
import { toast } from 'react-toastify';

const SystemSettingModal = () => {
    const [form, setForm] = useState({
        passwordOld: '',
        password1: '',
        password2: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const setAuth = useAuthStore((state) => state.setAuth);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { passwordOld, password1, password2 } = form;

        if (!passwordOld || !password1 || !password2) {
            setError('All fields are required.');
            return;
        }

        if (password1 !== password2) {
            setError("New passwords don't match.");
            return;
        }

        setLoading(true);

        try {
            const response = await instance.put('/user/password-change', form);
            console.log(response)
            if (response.data.status) {
                toast.success(response.data.message);
                const userData = response.data;
                setAuth(userData);
            } else {
                setError(response.data.message || 'Failed to change password.');
                toast.error(response.data.message || 'Failed to change password.');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || 'Something went wrong.');
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Change Your Password</h2>

                {error && <div className="text-red-600 mb-2">{error}</div>}
                {success && <div className="text-green-600 mb-2">{success}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Old Password</label>
                        <input
                            type="password"
                            name="passwordOld"
                            value={form.passwordOld}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-2 py-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">New Password</label>
                        <input
                            type="password"
                            name="password1"
                            value={form.password1}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-2 py-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            name="password2"
                            value={form.password2}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-2 py-1"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 text-white font-semibold rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Changing...' : 'Change Password'}
                    </button>
                </form>
            </div>


        </div>
    );
};

export default SystemSettingModal;
