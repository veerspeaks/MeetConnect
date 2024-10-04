<div className="flex">
      {/* Sidebar */}
      <div className="h-screen w-1/4  bg-gray-800 text-[#FFD369]">
        <ul className="p-10">
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
              setPage((prev) => (prev < pageRef.current ? prev + 1 : prev))
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
                  onClick={() =>
                    setVisibleAnswers((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
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
      </div>
    </div>