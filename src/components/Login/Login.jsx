import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Login'); // 'Login', 'Sign Up', 'Reset Password'
  const { setShowLogin, backendUrl, setToken, setUser, navigate } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Login') {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setShowLogin(false);
          navigate('/')
        } else {
          toast.error(data.message);
        }
      } else if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { email, password });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setShowLogin(false);
          navigate('/')
        } else {
          toast.error(data.message);
        }
      } else if (state === 'Reset Password' && !isEmailSent) {
        const { data } = await axios.post(`${backendUrl}/api/user/send-reset-otp`, { email });
        if (data.success) {
          setIsEmailSent(true);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else if (state === 'Reset Password' && isEmailSent && !isOtpSent) {
        setIsOtpSent(true)
      } else if (state === 'Reset Password' && isOtpSent) {
        const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, { email, otp, newPassword });
        if (data.success) {
          toast.success(data.message);
          setState('Login');
          setIsEmailSent(false);
          setIsOtpSent(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative min-w-[20vw] bg-white p-10 rounded-xl text-[#202020]"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
        {state === 'Login' && (
          <>
            <p className="text-sm text-center">Welcome back! Please sign in to continue</p>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="outline-none text-sm"
                placeholder="Email"
                type="email"
                required
              />
            </div>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 mb-[1rem]">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="outline-none text-sm"
                placeholder="Password"
                type="password"
                required
              />
            </div>
            <button
              className="text-sm text-blue-600 mb-[1rem] cursor-pointer hover:opacity-65"
              type="button"
              onClick={() => setState('Reset Password')}
            >
              Forgot Password?
            </button>
            <button className="bg-[#f0f4f9] w-full text-[#202020] py-2 rounded-full hover:opacity-65">
              Login
            </button>
            <p className="mt-5 text-center">
              Don't have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:opacity-65"
                onClick={() => setState('Sign Up')}
              >
                Sign Up
              </span>
            </p>
          </>
        )}
        {state === 'Sign Up' && (
          <>
            <p className="text-sm text-center">Welcome! Please sign up to continue</p>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="outline-none text-sm"
                placeholder="Email"
                type="email"
                required
              />
            </div>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 mb-[1rem]">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                minLength={8}
                className="outline-none text-sm"
                placeholder="Password"
                type="password"
                required
              />
            </div>
            <button className="bg-[#f0f4f9] w-full text-[#202020] py-2 rounded-full hover:opacity-65">
              Create Account
            </button>
            <p className="mt-5 text-center">
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:opacity-65"
                onClick={() => setState('Login')}
              >
                Login
              </span>
            </p>
          </>
        )}
        {state === 'Reset Password' && (
          <>
            {!isEmailSent && (
              <>
                <p className="text-sm text-center">Enter your registered email address</p>
                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="outline-none text-sm"
                    placeholder="Email"
                    type="email"
                    required
                  />
                </div>
                <button className="bg-[#f0f4f9] w-full text-[#202020] py-2 rounded-full hover:opacity-65 mt-5">
                  Submit
                </button>
              </>
            )}
            {isEmailSent && !isOtpSent && (
              <>
                <p className="text-sm text-center">Enter the 6-digit code sent to your email</p>
                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    className="outline-none text-sm"
                    placeholder="Verification Code"
                    type="number"
                    required
                  />
                </div>
                <button className="bg-[#f0f4f9] w-full text-[#202020] py-2 rounded-full hover:opacity-65 mt-5">
                  Submit
                </button>
              </>
            )}
            {isOtpSent && isEmailSent && (
              <>
                <p className="text-sm text-center">Enter your new password below</p>
                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className="outline-none text-sm"
                    placeholder="New Password"
                    type="password"
                    required
                  />
                </div>
                <button className="bg-[#f0f4f9] w-full text-[#202020] py-2 rounded-full hover:opacity-65 mt-5">
                  Submit
                </button>
              </>
            )}
          </>
        )}
        <button
          className="absolute top-5 right-5 text-lg text-[#202020] hover:opacity-65"
          type="button"
          onClick={() => setShowLogin(false)}
          aria-label="Close"
        >
          ✕
        </button>
      </form>
    </div>
  );
};

export default Login;
