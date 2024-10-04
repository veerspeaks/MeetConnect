import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const LogUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name,setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState(""); // New state for repeat password
  const [error,setError] = useState("");
  const [flashMessage, setFlashMessage] = useState(""); // New state for flash message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== repeatPassword) {
      flashErrorMessage("Passwords don't match"); // Flash message for password mismatch
      return; // Exit if passwords do not match
    }

    try{
      const response = await axios.post('/api/users/signup', {name: name, email : email, password :password} )
      if(response.status == 200){
        dispatch(loginUser({ email, password }))
        .then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
              navigate('/'); // Navigate only if the login is successful
          }
      })
      .catch(err => {
          console.log(err)
      });
      }
      if(response.data == "User already exist"){
        flashErrorMessage("User Already exists, please Sign in!")
      }
    }catch(err){
      console.log("error signing up", err)
    }
  }

  // Function to flash the error message
  const flashErrorMessage = (message) => {
    setFlashMessage(message);
    setTimeout(() => {
        setFlashMessage(""); // Clear the message after 3 seconds
    }, 3000);
  };

  return (
    <div className="p-4 rounded-lg shadow-md border-2 border-yellow-500  sm:w-1/2 w-full">
      <h2 className="text-lg font-bold text-[#FFD369] text-center">Sign Up</h2>
      <div className="text-center">
      {flashMessage && <div className="flash-message text-red-400">{flashMessage}</div>}
      </div>
      
      <form className="mt-4">
      <div className="mb-6 flex flex-col items-center">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white mb-2"
          >
            Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            className="mt-1 block w-3/4 rounded-full border-2 border-yellow-500 shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            className="mt-1 block w-3/4 rounded-full border-2 border-yellow-500 shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
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
            className="mt-1 block w-3/4 rounded-full border-2 border-yellow-500 shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-10 flex flex-col items-center">
          <label
            htmlFor="repeat-password"
            className="block text-sm font-medium text-white mb-2"
          >
            Repeat Password
          </label>
          <input
            type="password"
            name="repeat-password"
            id="repeat-password"
            className="mt-1 block w-3/4 rounded-full border-2 border-yellow-500 shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="Repeat your password"
            onChange={(e) => setRepeatPassword(e.target.value)} // Update state on change
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Register
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default LogUp;
