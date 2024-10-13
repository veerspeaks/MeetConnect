import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate instead of history


const DisplayQuestions = () => {
  const { category } = useParams(); // Get category from URL params
  const navigate = useNavigate(); // Initialize useNavigate

  // Set initial selected category from params or default to "front end"
  const [selected, setSelected] = useState(category || "front end");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const [visibleAnswers, setVisibleAnswers] = useState({}); // Track visibility of answers

  const questionsArrayRef = useRef([]);
  const pageRef = useRef(1);

  // Fetch questions based on selected category and page number
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get("/api/questions", {
          params: {
            page: page,
            limit: 10,
            questionCategory: selected,
          },
        });
        questionsArrayRef.current = response.data.questions; // Store in useRef
        pageRef.current = response.data.totalPages;
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchQuestions();
  }, [selected, page]); // Fetch questions when selected category or page changes

  // Handle category change from URL params
  useEffect(() => {
    setSelected(category || "front end"); // Default to "front end" if no category is provided
    setPage(1); // Reset to page 1 when changing categories
    setVisibleAnswers({}); // Reset visible answers when category changes
  }, [category]);

  // Handle page change
  useEffect(() => {
    setVisibleAnswers({}); // Reset visible answers when the page changes
  }, [page]);

  // Handle category selection
  const handleSelect = (listName) => {
    if (listName !== selected) {
      setSelected(listName); // Change the selected category
      setPage(1); // Reset to page 1 when changing categories
      setVisibleAnswers({}); // Reset visible answers when changing categories
      // Navigate to the new category route
      navigate(`/questions/${listName}`); // Use navigate to update the URL
    }
  };

  // Handle opening/closing answers
  const toggleAnswerVisibility = (index) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the visibility of the answer at this index
    }));
  };

  return (
    <>
      {/* For small and medium screen */}
      <div className="md:hidden">
        <div className="flex-col ">
          {/* Sidebar */}
          <div className="w-full bg-gray-800 text-[#FFD369]">
            <ul className="p-10 text-center">
              <li
                className={`p-5 cursor-pointer transition-all duration-300 ease-in-out ${
                  selected === "front end"
                    ? "bg-gray-900 rounded-md"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleSelect("front end")}
              >
                Front End
              </li>
              <li
                className={`p-5 cursor-pointer transition-all duration-300 ease-in-out ${
                  selected === "back end"
                    ? "bg-gray-900 rounded-md"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleSelect("back end")}
              >
                Back End
              </li>
              <li
                className={`p-5 cursor-pointer transition-all duration-300 ease-in-out ${
                  selected === "full stack"
                    ? "bg-gray-900 rounded-md"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleSelect("full stack")}
              >
                Full Stack
              </li>
              <li
                className={`p-5 cursor-pointer transition-all duration-300 ease-in-out ${
                  selected === "behavioral"
                    ? "bg-gray-900 rounded-md"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleSelect("behavioral")}
              >
                Behavioral
              </li>
            </ul>
          </div>
          <div className="h-screen w-full overflow-y-auto bg-[#222831] px-8 py-8">
            <div className="flex justify-center items-center mb-8">
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
                disabled={page === 1}
              >
                Previous
              </button>
              <div className="text-white font-semibold">
                Page {page} of {pageRef.current}
              </div>
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded-md ml-2"
                onClick={() =>
                  setPage((prev) =>
                    prev < pageRef.current ? prev + 1 : prev
                  )
                }
                disabled={page === pageRef.current}
              >
                Next
              </button>
            </div>

            {loading ? (
              <div className="text-white">Loading...</div>
            ) : (
              <ul className="space-y-2">
                {questionsArrayRef.current.map((question, index) => (
                  <li
                    key={index}
                    className="flex flex-col p-4 bg-gray-900 text-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div
                      className="flex justify-between"
                      onClick={() => toggleAnswerVisibility(index)}
                    >
                      <div className="cursor-pointer text-lg font-semibold">
                        {question.question}
                      </div>
                      <button className="ml-2 text-xl">
                        {visibleAnswers[index] ? "▲" : "▼"}
                      </button>
                    </div>
                    {visibleAnswers[index] && (
                      <div className="mt-2 text-white p-2 bg-[#222831] rounded-md border border-[#FFD369]">
                        {question.answer}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

