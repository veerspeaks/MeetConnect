import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const LogIn = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSignIn = (e) => {
    e.preventDefault();
    
    dispatch(loginUser({ email, password }))
        .then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                navigate('/'); // Navigate only if the login is successful
            } else {
                setError("Wrong username or password"); // Set error message for non-fulfilled status
            }
        })
        .catch(err => {
            setError("Wrong username or password"); // Set error message for catch block
        });
};


  return (
    <div className="p-4 rounded-lg shadow-md border-2 border-yellow-500 sm:w-1/2 w-full">
      <h2 className="text-lg font-bold text-[#FFD369] text-center">Log In</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form className="mt-4" onSubmit={handleSignIn}>
        <div className="mb-6 flex flex-col items-center">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-3/4 rounded-full border-2 border-yellow-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-10 flex flex-col items-center">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 block w-3/4 rounded-full border-2 border-yellow-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
