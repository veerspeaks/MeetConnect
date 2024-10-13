import React, { useEffect, useState } from "react";
import InterviewCard from "../components/InterviewCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchInterviews } from "../redux/slices/interviewSlice";

const DisplayInterviews = () => {
  const userId = useSelector((state) => state.user.user.user._id); // Getting user ID from user state
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchInterviews(userId));
    }
  }, [dispatch, userId]); // Dependency array ensures this runs only when userId is available

  const interviews = useSelector((state) => state.interviews.interviews); // Getting interviews from interview state
  const newInterview = useSelector((state) => state.interviews.NewIntervie); // Get the newly added interview

 
  const [selected, setSelected] = useState("All Interviews");

  const handleSelect = (listName) => {
    setSelected(listName);
  };

  // Filter interviews based on their status
  const completedInterviews = interviews.filter(
    (interview) => interview.status === "completed"
  );
  const upcomingInterviews = interviews.filter(
    (interview) => interview.status === "pending"
  );

 

  return (
    <>
    {/* //display interviews on smaller and medium screen */}
    <div className="md:hidden">
    <div className="flex-col">
      {/* Sidebar */}
      <div className=" w-full bg-gray-800 text-[#FFD369]">
        <ul className="p-10">
          {/* Sidebar with smooth hover effects */}
          <li
            className={`p-5 cursor-pointer transition-all duration-300 ease-in-out ${
              selected === "All Interviews" ? "bg-gray-900 rounded-md" : "hover:bg-gray-700"
            }`}
            onClick={() => handleSelect("All Interviews")}
          >
            All Interviews
          </li>
          <li
            className={`p-5 cursor-pointer transition-all duration-300 ease-in-out ${
              selected === "Completed Interviews" ? "bg-gray-900 rounded-md" : "hover:bg-gray-700"
            }`}
            onClick={() => handleSelect("Completed Interviews")}
          >
            Completed Interviews
          </li>
          <li
            className={`p-5 cursor-pointer transition-all duration-300 ease-in-out ${
              selected === "Upcoming Interviews" ? "bg-gray-900 rounded-md" : "hover:bg-gray-700"
            }`}
            onClick={() => handleSelect("Upcoming Interviews")}
          >
            Upcoming Interviews
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="h-screen w-full bg-[#222831] border-t-2 border-yellow-500 overflow-y-auto"> 
        {/* Render interview cards based on selected tab */}
        {selected === "All Interviews" && (
          <ul className="flex flex-wrap gap-4 p-4">
            {[...interviews].map((interview) => (
              <InterviewCard
                key={interview?._id}
                interviewerId={interview?.interviewerId} 
                category={interview?.category}
                isCompleted={interview?.status}
                Score={interview?.feedback?.score}
                Comments={interview?.feedback?.comments}
                date={interview?.scheduledDate} 
                className="w-full sm:w-1/2 md:w-1/3 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out"
                isMobile={true}
              />
            ))}
          </ul>
        )}

        {selected === "Completed Interviews" && (
          <ul className="flex flex-wrap gap-4 p-4">
            {completedInterviews.map((interview) => (
              <InterviewCard
                key={interview?._id}
                interviewerId={interview?.interviewerId}
                category={interview?.category}
                isCompleted="completed"
                Score={interview?.feedback?.score}
                Comments={interview?.feedback?.comments}
                date={interview?.scheduledDate} 
                className="w-full sm:w-1/2 md:w-1/3 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out"
                isMobile={true}
              />
            ))}
          </ul>
        )}

        {selected === "Upcoming Interviews" && (
          <ul className="flex flex-wrap gap-4 p-4">
            {upcomingInterviews.map((interview) => (
              <InterviewCard
                key={interview?._id}
                interviewerId={interview?.interviewerId}
                category={interview?.category}
                isCompleted="pending"
                date={interview?.scheduledDate} 
                className="w-full sm:w-1/2 md:w-1/3 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out"
                isMobile={true}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>

    {/* display interview for larger screeen */}
    <div className="hidden md:block">
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen w-1/4 bg-gray-800 text-[#FFD369]">
        <ul className="p-10">
          {/* Sidebar with smooth hover effects */}
          <li
            className={`p-5 cursor-pointer transition-all duration-300 ease-in-out ${
              selected === "All Interviews" ? "bg-gray-900 rounded-md" : "hover:bg-gray-700"
            }`}
            onClick={() => handleSelect("All Interviews")}
          >
            All Interviews
          </li>
          <li
            className={`p-5 cursor-pointer transition-all duration-300 ease-in-out ${
              selected === "Completed Interviews" ? "bg-gray-900 rounded-md" : "hover:bg-gray-700"
            }`}
            onClick={() => handleSelect("Completed Interviews")}
          >
            Completed Interviews
          </li>
          <li
            className={`p-5 cursor-pointer transition-all duration-300 ease-in-out ${
              selected === "Upcoming Interviews" ? "bg-gray-900 rounded-md" : "hover:bg-gray-700"
            }`}
            onClick={() => handleSelect("Upcoming Interviews")}
          >
            Upcoming Interviews
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="h-screen w-3/4 bg-[#222831] border-t-2 border-yellow-500 overflow-y-auto"> 
        {/* Render interview cards based on selected tab */}
        {selected === "All Interviews" && (
          <ul className="flex flex-wrap gap-4 p-4">
            {[...interviews].map((interview) => (
              <InterviewCard
                key={interview?._id}
                interviewerId={interview?.interviewerId} 
                category={interview?.category}
                isCompleted={interview?.status}
                Score={interview?.feedback?.score}
                Comments={interview?.feedback?.comments}
                date={interview?.scheduledDate} 
                className="w-full sm:w-1/2 md:w-1/3 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out"
              />
            ))}
          </ul>
        )}

        {selected === "Completed Interviews" && (
          <ul className="flex flex-wrap gap-4 p-4">
            {completedInterviews.map((interview) => (
              <InterviewCard
                key={interview?._id}
                interviewerId={interview?.interviewerId}
                category={interview?.category}
                isCompleted="completed"
                Score={interview?.feedback?.score}
                Comments={interview?.feedback?.comments}
                date={interview?.scheduledDate} 
                className="w-full sm:w-1/2 md:w-1/3 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out"
              />
            ))}
          </ul>
        )}

        {selected === "Upcoming Interviews" && (
          <ul className="flex flex-wrap gap-4 p-4">
            {upcomingInterviews.map((interview) => (
              <InterviewCard
                key={interview?._id}
                interviewerId={interview?.interviewerId}
                category={interview?.category}
                isCompleted="pending"
                date={interview?.scheduledDate} 
                className="w-full sm:w-1/2 md:w-1/3 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out"
              />
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default DisplayInterviews;
