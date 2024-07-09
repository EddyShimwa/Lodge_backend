import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store'; // Adjust the import path according to your store setup
import { loginUser } from '../../redux/slices/signInSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, message, user } = useSelector((state: RootState) => state.signIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'receptionist') {
        navigate('/all-rooms');
      }
    }
  }, [user, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a222c]">
      <div className="flex flex-col w-full max-w-md p-6 space-y-4 rounded-md shadow-lg dark:bg-gray-50 dark:text-gray-800 bg-[#1d252e]">
        <div className="mb-1 text-center">
          <h1 className="my-1 text-4xl font-bold text-white">Sign in</h1>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form noValidate action="" className="space-y-12" onSubmit={handleSubmit}>
          <div className="space-y-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password</label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button type="submit" className="w-full px-8 py-3 font-semibold text-white rounded-md bg-violet-600 dark:text-gray-50" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Please wait...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
            {message && <p className="text-green-500 text-sm text-center">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
