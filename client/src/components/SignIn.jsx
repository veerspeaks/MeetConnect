import React from "react";
import LogIn from "./LogIn";
import LogUp from "./Logup";
import { useState } from "react";


const SignIn = () => {
  const [toggle, setToggle] = useState("Sign In");
 



  const handleToggle = (e) => {
    const select = e.target.value;
    setToggle(select);
  };


 

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-row mb-14 w-80 border border-gray-500 rounded-full">
        <button
          className={`px-4 py-2 rounded-l-full w-1/2 transition-all duration-300 ${toggle === "Sign In" ? "bg-[#FFD369] text-black" : "bg-none text-white"}`}
          value={"Sign In"}
          onClick={handleToggle}
        >
          Sign In
        </button>
        <button
          className={`px-4 py-2 rounded-r-full w-1/2 transition-all duration-300 ${toggle === "Sign Up" ? "bg-[#FFD369] text-black" : "bg-none text-white"}`}
          value={"Sign Up"}
          onClick={handleToggle}
        >
          Sign Up
        </button>
      </div>
      {toggle === "Sign In" ? <LogIn /> : <LogUp />}
    </div>
  );
};

export default SignIn;
