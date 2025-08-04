
import React, { useState } from 'react';
import { Check, Eye, EyeOff, OctagonAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../context/AuthContext';
import instance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const VITE_API_URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await instance.post(`${VITE_API_URL}auth/login`, loginDetails);
      const response = res.data

      if (!response.status) {
        toast.error(response?.message);
        setLoading(false);
        return;
      }

      const userData = response.data;

      setToken(userData.token);
      setUser(userData);
      toast.success(response?.message);

      setTimeout(() => {
        setSnackbar(null);
        navigate('/overview');
      }, 1500);

    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] relative">
      {snackbar && (
        <div className={`absolute top-5 right-5 px-4 py-3 rounded-md text-sm shadow-md 
          ${snackbar.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
          {snackbar.message}
        </div>
      )}

      <div className='w-full max-w-sm text-center mb-8 flex flex-col items-center'>
        <img src={logo} alt="Logo" className="w-24 mx-auto mb-6" />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-[22px] font-semibold text-[#1A1A1A]">Log In</h1>
          <p className="text-sm text-[#767676]">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-[#1A1A1A] block mb-1">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={loginDetails.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-[#1A1A1A] block mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={loginDetails.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary_blue text-white font-semibold py-3 rounded-md text-sm flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Logging in...
              </>
            ) : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
