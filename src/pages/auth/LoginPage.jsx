import React, { useState } from 'react';
import { Check, Eye, EyeOff, OctagonAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Adjust the path as necessary

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState(null); // { type: 'error' | 'success', message: string }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake validation
    const isValid = !false;

      if (isValid) {
      setSnackbar({ type: 'success', 
        message: (
            <span className="flex items-center gap-2">
                <Check className="w-4 h-4"/>
                Login successful!
            </span>
        ) ,
    });

    } else {
      setSnackbar({
        type: 'error',
        message: (
          <span className="flex items-center gap-2">
            <OctagonAlert className="w-4 h-4" />
            Invalid email or password. Please try again.
          </span>
        ),
      });
    }

    // Hide snackbar after 5 seconds
    setTimeout(() => setSnackbar(null), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] relative">
      {/* Snackbar */}
      {snackbar && (
        <div className={`absolute top-5 right-5 px-4 py-3 rounded-md text-sm shadow-md 
          ${snackbar.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}
        `}>
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
              type="email"
              placeholder="Your email address here"
              className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder:text-sm text-[#484848] focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-[#1A1A1A] block mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password here"
                className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder:text-sm text-[#484848] pr-10 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="text-right mt-1">
              <a href="forgot-password" className="text-sm text-primary_blue font-medium hover:underline">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary_blue text-white font-semibold py-3 rounded-md text-sm"
          >
           <Link to="/overview">
            Log In
           </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
