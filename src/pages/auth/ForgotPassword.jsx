import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { toast } from 'react-toastify';
import instance from '../../utils/axiosInstance';


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [passwordEmail, setPasswordEmail] = useState({ email: '', });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setPasswordEmail({ ...passwordEmail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await instance.post("auth/password-reset", passwordEmail);
      const response = res.data;
      console.log(res)

      if (!response.status) {
        toast.error(response?.message);
        setLoading(false);
        return;
      }

      toast.success(response?.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] relative">
        <div className='w-full max-w-sm text-center mb-8 flex flex-col items-center'>
            <img src={logo} alt="Logo" className="w-24 mx-auto mb-6" />
        </div>
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-[22px] font-semibold text-[#1A1A1A]">Forgot Password</h1>
          <p className="text-sm text-[#767676]">Enter your email associated with your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         <div>
            <label htmlFor="email" className="text-sm font-semibold text-[#1A1A1A] block mb-1">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={passwordEmail.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
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
                Submitting...
              </>
            ) : 'Submit'}
          </button>
        </form>
        <div className='w-full flex justify-center items-center mt-4 cursor-pointer' onClick={() => navigate(-1)}>
        <ChevronLeft />
        <span>Go Back</span>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
