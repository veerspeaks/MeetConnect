import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/slices/userSlice';
import userIcon from '../assets/icons8-user-100.png'

const UserDetail = () => {
  
  const user = useSelector((state) => state.user); // Accessing user data
  const loading = useSelector((state) => state.user.loading); // Accessing loading state
  const dispatch = useDispatch(); // Dispatch function to dispatch actions

  // State for the form fields and work experience
  const [name, setName] = useState(user.user.user?.name || '');
  const [email] = useState(user.user.user?.email || ''); // Make email read-only
  const [yearOfStudy, setYearOfStudy] = useState(user.user.user.additionalInfo.studentProfile?.yearOfStudy || '');
  const [expertise, setExpertise] = useState(user.user.user.additionalInfo.studentProfile?.major || '');
  const [workExperience, setWorkExperience] = useState(user.user.user.additionalInfo.studentProfile?.workExperience || []);
  const [newExperience, setNewExperience] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingExperience, setEditingExperience] = useState('');
  
  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(user.user?.profilePicture || '');

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result); // Set the profile picture to the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding a new work experience
  const handleAddExperience = () => {
    if (editingIndex !== null) {
      // If editing an existing experience
      const updatedExperience = workExperience.map((experience, index) => 
        index === editingIndex ? editingExperience : experience
      );
      setWorkExperience(updatedExperience);
      setEditingIndex(null);
      setEditingExperience('');
    } else if (newExperience) {
      // If adding a new experience
      setWorkExperience([...workExperience, newExperience]);
      setNewExperience('');
    }
  };

  // Handle editing an experience
  const handleEditExperience = (index) => {
    setEditingIndex(index);
    setEditingExperience(workExperience[index]);
  };

  // Handle deleting an experience
  const handleDeleteExperience = (index) => {
    const updatedExperience = workExperience.filter((_, i) => i !== index);
    setWorkExperience(updatedExperience);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, yearOfStudy, expertise, workExperience, profilePicture }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-[#FFD369]">
      <h2 className="text-3xl font-bold mb-4">User Details</h2>
      {loading ? (
        <p className="text-yellow-400">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
          <div className="relative mb-4">
            {profilePicture  ? (
              <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full shadow-lg" />
            ):(
              <img src={userIcon} ></img>
            )
            
            }
            
            
            {/* Edit button at the bottom-right of the profile image */}
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-yellow-500 text-gray-800 rounded-full p-2 hover:bg-yellow-400 transition duration-200"
              onClick={() => document.getElementById('fileInput').click()}
            >
              ✎
            </button>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>

          <div className="form-group w-full">
            <label className="block font-medium">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-yellow-500 rounded-md p-2 bg-gray-700 text-white"
            />
          </div>

          <div className="form-group w-full">
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              value={email}
              readOnly // Make email input read-only
              className="mt-1 block w-full border border-yellow-500 rounded-md p-2 bg-gray-700 text-white cursor-not-allowed"
            />
          </div>

          <div className="form-group w-full">
            <label className="block font-medium">Year of Study:</label>
            <input
              type="text"
              value={yearOfStudy}
              onChange={(e) => setYearOfStudy(e.target.value)}
              required
              className="mt-1 block w-full border border-yellow-500 rounded-md p-2 bg-gray-700 text-white"
            />
          </div>

          <div className="form-group w-full">
            <label className="block font-medium">Expertise:</label>
            <input
              type="text"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              required
              className="mt-1 block w-full border border-yellow-500 rounded-md p-2 bg-gray-700 text-white"
            />
          </div>

          <div className="form-group w-full">
            <label className="block font-medium">Work Experience:</label>
            <div className="flex flex-col space-y-2">
              {workExperience.map((experience, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-900 text-white p-2 rounded-md">
                  <span>{experience}</span>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleEditExperience(index)}
                      className="bg-[#FFD369] text-black rounded-md px-2 py-1 hover:bg-yellow-200 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteExperience(index)}
                      className="ml-2 bg-red-800 text-white rounded-md px-2 py-1 hover:bg-red-400 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex">
                <input
                  type="text"
                  value={editingIndex !== null ? editingExperience : newExperience}
                  onChange={(e) => editingIndex !== null ? setEditingExperience(e.target.value) : setNewExperience(e.target.value)}
                  placeholder="Add new experience"
                  className="mt-1 block w-full border border-yellow-500 rounded-md p-2 bg-gray-700 text-white"
                />
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="ml-2 bg-yellow-500 text-gray-800 rounded-md px-4 py-2 hover:bg-yellow-400 transition duration-200"
                >
                  {editingIndex !== null ? 'Update' : '+'}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-1/3 bg-[#FFD369] font-bold text-gray-800 rounded-md px-4 py-2 hover:bg-yellow-400 transition duration-200"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default UserDetail;
