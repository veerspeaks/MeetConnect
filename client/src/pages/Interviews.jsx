import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchInterviews } from '../redux/slices/interviewSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DisplayInterviews from '../components/DisplayInterviews';

    
const Interviews = () => {
    return (
        <>
        <Navbar/>
        <DisplayInterviews/>
        <Footer/>
        </>
        
    )

}

    

export default Interviews;
