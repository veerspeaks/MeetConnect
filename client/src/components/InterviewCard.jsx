import React, { useEffect, useState } from 'react';
import behavioral from '../assets/behavioral.png';
import frontEnd from '../assets/front_end.png';
import backEnd from '../assets/back_end.png';
import fullStack from '../assets/full_stack.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InterviewCard = ({ interviewerId, category, isCompleted, Score, Comments, date, isMobile }) => {
  const navigate = useNavigate();

  const images = {
    'front end': frontEnd,
    'behavioral': behavioral,
    'full stack': fullStack,
    'back end': backEnd,
  };

  const [timeRemaining, setTimeRemaining] = useState('');
  const [interviewerName, setInterviewerName] = useState('');

  useEffect(() => {
    const fetchInterviewerName = async () => {
      try {
        const user = await axios.get('/api/users');
        const interviewersArray = user.data.filter((user) => user.role === 'interviewer');
        const interviewerName = interviewersArray.find((interviewer) => interviewer._id === interviewerId)?.name;
        setInterviewerName(interviewerName || 'Unknown');
      } catch (e) {
        console.log('Error fetching interviewer details:', e);
      }
    };

    const calculateTimeRemaining = () => {
      const now = new Date();
      const target = new Date(date);
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining('Time is up!');
      }
    };

    fetchInterviewerName();
    calculateTimeRemaining();

    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [date, interviewerId]);

  const handlePractice = (category) => {
    navigate(`/questions/${encodeURIComponent(category)}`);
  };

  return (
    <div className="w-full">
      {isCompleted === 'completed' && (
        <div className={`flex border-2 border-yellow-100 justify-center shadow-md bg-white w-full max-w-3xl ${isMobile ? 'flex-col sm:flex-row' : 'flex-row'}`}>
          <div className={`flex flex-col items-center`}>
            <img src={images[category]} alt={category} className="h-36 object-cover" />
            <span className="text-xl font-bold">{category}</span>
          </div>
          <div className={`flex-col bg-[#222831] p-4 w-full h-44 ${isMobile ? 'flex' : 'flex-row'}`}>
            <div className='flex items-center justify-between'>
              <span className="bg-[#FFD369] p-2 rounded-full font-bold">Completed</span>
              <div>
                <span className='text-[#FFD369] font-bold'>Interviewer: </span>
                <span className='text-white'>{interviewerName || 'loading...'}</span>
              </div>
              <span className="text-white px-1 block">{date}</span>
            </div>
            <div className="py-4 flex justify-between">
              <div className="w-2/3">
                <span className="text-[#FFD369]">Comments</span>
                <p className="text-white border-r border-white pr-4">{Comments}</p>
              </div>
              <div className="flex flex-col items-center w-1/3">
                <span className="text-5xl text-[#FFD369]">{Score}</span>
                <span className="text-white">Out of 10</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCompleted === 'pending' && (
        <div className={`flex border-2 border-yellow-100 justify-center shadow-md bg-white w-full max-w-3xl ${isMobile ? 'flex-col sm:flex-row' : 'flex-row'}`}>
          <div className={`flex flex-col items-center`}>
            <img src={images[category]} alt={category} className="h-36 object-cover" />
            <span className="text-xl font-bold">{category}</span>
          </div>
          <div className={`flex-col bg-[#222831] p-4 w-full h-44 ${isMobile ? 'flex' : 'flex-row'}`}>
            <div className='flex items-center justify-between'>
              <div>
                <span className='text-[#FFD369] font-bold'>Interviewer: </span>
                <span className='text-white'>{interviewerName || 'loading...'}</span>
              </div>
              <span className="text-white px-1 block">{date}</span>
            </div>
            <div className="py-4 flex justify-between">
              <div className={`flex text-center  ${isMobile ? 'flex-row w-full justify-between' : 'flex-col w-2/3 justify-start'}`}>
                <span className="text-[#FFD369] font-bold">Interview starts in </span>
                <span className='text-white font-bold'>{timeRemaining}</span>
              </div>
            </div>
            <div className='flex items-end justify-end gap-4'>
              <button className="bg-gray-200 px-4 py-2 rounded-full font-bold text-start" onClick={() => handlePractice(category)}>Practice Questions</button>
              <button className="bg-[#FFD369] px-4 py-2 rounded-full font-bold">Join</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewCard;