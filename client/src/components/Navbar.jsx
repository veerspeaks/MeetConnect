import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import userIcon from "../assets/icons8-user-50.png";

function Navbar() {
  const [selectedIndex, setSelectedIndex] = useState(0); // Default to "Schedule"
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // Separate state for mobile dropdown
  const user = useSelector((state) => state.user.user.user);

  const dropdownRef = useRef(null); // Ref for the desktop dropdown
  const mobileDropdownRef = useRef(null); // Ref for the mobile dropdown
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Hook to get the current route

  // Update selected index based on the current route
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedIndex(0); // Schedule
    } else if (location.pathname === "/my-interviews") {
      setSelectedIndex(1); // My Interviews
    } else if (location.pathname.startsWith("/questions")) {
      setSelectedIndex(2); // Practice Resource
    } else if (location.pathname === "/profile") {
      setSelectedIndex("profile"); // Profile
    } else {
      setSelectedIndex(0); // Default case
    }
  }, [location.pathname]);

  const handleSelect = (index, item) => {
    setSelectedIndex(index);
    if (item === "Schedule") {
      navigate("/"); // Change from window.location.href to navigate
    } else if (item === "My Interviews") {
      navigate("/my-interviews");
    } else if (item === "Practice Resource") {
      navigate("/questions");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setSelectedIndex("profile"); // Update index immediately
  };

  const handleSignOutClick = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };

  // Close the dropdown if clicked outside for desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close the dropdown if clicked outside for mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#222831] p-6 shadow-md">
      <div className="md:hidden">
        <div className="flex justify-between">
          <span className="text-2xl md:text-4xl text-[#FFD369] font-bold">
            {"<MeetConnect />"}
          </span>
          <li
            className="relative text-white flex items-center cursor-pointer"
            ref={mobileDropdownRef} // Use mobile dropdown ref
          >
            <img
              src={user.profilePicture ? user.profilePicture : userIcon} // Placeholder for the user's image, fetched from API
              alt="User"
              className="w-4 h-4 rounded-full mr-2" // Adjust size as needed
            />
            <span
              onClick={toggleMobileDropdown} // Toggle mobile dropdown
              className={
                selectedIndex === "profile" ? "border-b-2 border-[#FFD369]" : ""
              }
            >
              {user.name}
            </span>
            {mobileDropdownOpen && (
              <ul className="absolute left-0 mt-32 w-32 bg-gray-800 rounded-md shadow-lg z-10">
                <li>
                  <button
                    onClick={handleProfileClick} // Ensure this is working for mobile
                    className="block px-2 py-2 text-white hover:bg-gray-700 w-full text-left"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleSignOutClick} // Ensure this is working for mobile
                    className="block px-2 py-2 text-white hover:bg-gray-700 w-full text-left"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </li>
        </div>
        <div className="flex justify-center pt-10 rounded-full">
          <select
            value={selectedIndex}
            onChange={(e) =>
              handleSelect(
                e.target.value,
                e.target.options[e.target.selectedIndex].text
              )
            }
            className="bg-gray-900 text-white p-2 rounded-full"
          >
            {["Schedule", "My Interviews", "Practice Resource"].map(
              (item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div className="hidden md:flex justify-between">
        <span className="md:text-4xl text-[#FFD369] font-bold">
          {"<MeetConnect />"}
        </span>
        <div className="flex pr-10">
          {/* Navigation for larger screens */}
          <ul className="flex gap-4 text-white pt-4">
            {["Schedule", "My Interviews", "Practice Resource"].map(
              (item, index) => (
                <li
                  key={index}
                  className={
                    selectedIndex === index ? "border-b-2 border-[#FFD369]" : ""
                  }
                  onClick={() => handleSelect(index, item)}
                >
                  {item}
                </li>
              )
            )}
            <li
              className="relative flex items-center cursor-pointer"
              ref={dropdownRef} // Use desktop dropdown ref
            >
              <img
                src={user.profilePicture ? user.profilePicture : userIcon} // Placeholder for the user's image, fetched from API
                alt="User"
                className="w-4 h-4 rounded-full mr-2" // Adjust size as needed
              />
              <span
                onClick={toggleDropdown} // Toggle desktop dropdown
                className={
                  selectedIndex === "profile"
                    ? "border-b-2 border-[#FFD369]"
                    : ""
                }
              >
                {user.name}
              </span>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-32 w-32 bg-gray-800 rounded-md shadow-lg z-10">
                  <li>
                    <button
                      onClick={handleProfileClick}
                      className="block px-2 py-2 text-white hover:bg-gray-700 w-full text-left"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOutClick}
                      className="block px-2 py-2 text-white hover:bg-gray-700 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
