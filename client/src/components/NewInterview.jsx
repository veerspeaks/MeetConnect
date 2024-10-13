import React, { useEffect, useState } from "react";
import ResponsiveDateTimePickers from "./DateTimepicker";
import { useDispatch } from "react-redux";
import { addInterview } from "../redux/slices/interviewSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs'; // Import dayjs for date formatting
import utc from 'dayjs/plugin/utc'; // Import UTC plugin
import timezone from 'dayjs/plugin/timezone'; // Import timezone plugin

dayjs.extend(utc); // Extend dayjs with UTC plugin
dayjs.extend(timezone); // Extend dayjs with timezone plugin

const NewInterview = () => {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("front end");
  const [interviewrs, setInterviewers] = useState(null);
  const [int, setInt] = useState(interviewrs);
  const user = useSelector((state) => state.user.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (e) {
        console.log("error fetching data", e);
      }
    };
    fetchCategories();

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        const filteredInterviewers = data.filter(
          (user) => user.role === "interviewer"
        );
        setInterviewers(filteredInterviewers);
        
        // Set initial state of int to the _id of the first interviewer
        if (filteredInterviewers.length > 0) {
          setInt(filteredInterviewers[0]._id); // Set initial state
        }
        
      } catch (e) {
        console.log("error fetching data", e);
      }
    };
    fetchUsers();
  }, []); // Added dependency array to run useEffect only once

  const handleSelectCategory = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  const handleSelectInterviewer = (event) => {
    const interviewerId = event.target.value;
    setInt(interviewerId);
  };

  const [dateTime, setDateTime] = useState(dayjs()); // Add state for dateTime

  const handleSubmit = () => {
    const userId = user._id;
    
    // Format dateTime to the required format in IST
    const formattedDate = dateTime.tz('Asia/Kolkata').format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"); // Save as Indian Standard Time
    
    // Ensure int is defined and valid before dispatching
    if (int) {
        dispatch(addInterview({ studentId: userId, interviewerId: int, category: selectedCategory, date: formattedDate })); // Include formatted date
        
        navigate('/my-interviews');
    } else {
        console.log("Interviewer ID is not selected");
    }
  };

  return (
    <div className="w-full flex flex-col md:px-16 bg-[#393E46] ">
      <form className="flex flex-col md:flex-row justify-between gap-4 pb-10 ">
        <div className=" flex flex-col gap-4 text-white text-lg">
          <label htmlFor="interviewType" className="">
            Select the Interview Type:
          </label>
          <select
            id="interviewType"
            name="interviewType"
            className="bg-[#222831] text-white px-4 py-3.5 rounded-full text-md border-yellow-500 border-2"
            onChange={handleSelectCategory}
          >
            {categories ? (
              categories.map((category) => (
                <option
                  className="text-white"
                  key={category.id}
                  value={category.id}
                >
                  {category.categoryName}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>
        <div className="text-white flex flex-col gap-4 text-lg text-white">
          <label htmlFor="interviewerName" className="">
            Select the Interviewer:
          </label>
          <select
            id="interviewerName"
            name="interviewerName"
            className="bg-[#222831] text-white px-4 py-3.5 rounded-full text-md border-yellow-500 border-2"
            onChange={handleSelectInterviewer}
          >
            {interviewrs ? (
              interviewrs.map(
                (interviewer) =>
                  interviewer.additionalInfo.interviewerProfile.expertise.includes(
                    selectedCategory
                  ) && (
                    <option
                      className="text-white"
                      key={interviewer.id}
                      value={interviewer._id}
                    >
                      {interviewer.name}
                    </option>
                  )
              )
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="interviewDate" className="text-white text-lg">
            {" "}
            Select Interview Date:
          </label>
          <ResponsiveDateTimePickers setDateTime={setDateTime} /> {/* Pass setDateTime to child */}
        </div>
      </form>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-4 bg-[#FFD369] w-40  px-4 py-2 rounded-full text-md hover:bg-yellow-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewInterview;
