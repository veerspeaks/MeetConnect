import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import NewInterview from './NewInterview';

const ScheduleInterview = () => {
    const [isOpen, setIsOpen] = useState(false);
    const options = ["<Behavioral/>", "<Full-stack/>", "<Frontend/>", "<Backend/>", "<DSA/>"]
    const updatedOptions = []
    options.forEach((option)=> {
        updatedOptions.push(option,500)
    })

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-[#222831] w-full h-screen pb-10 items-center flex  gap-2 flex-col">
            <button 
                className='bg-[#FFD369] text-md text-black rounded-full p-4'
                onClick={handleButtonClick}
            >
                Schedule New Interview
            </button>
            {isOpen && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#393E46] p-4 mt-8 w-2/3 rounded-lg"
                >
                    <NewInterview/>
                </motion.div>

            )}
            {!isOpen && (
                <div className='pt-10 hidden md:block'>
                <TypeAnimation
                    sequence={updatedOptions}
                    speed = {{type: 'keyStrokeDelayInMs', value: 200}}
                    deletionSpeed={{type: 'keyStrokeDelayInMs', value: 200}}
                    style={{ fontSize: window.innerWidth < 768 ? '2em' : '8em', color:'#EEEEEE'}}
                    repeat={Infinity}
                   
    />
                </div>
                
            
            )}
        </div>
    );
};

export default ScheduleInterview;