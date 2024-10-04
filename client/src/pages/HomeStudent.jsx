import Navbar from '../components/Navbar.jsx'
import Banner from '../components/Banner.jsx'
import ScheduleInterview from '../components/ScheduleInterview.jsx'
import Footer from '../components/Footer.jsx'
import {useState, useEffect} from 'react'
import axios from 'axios'


function HomeStudent() {
  const [user, setUser] = useState(null);

  useEffect(() =>{

    const fetchUserInfo = async () => {
        try{
            const response = await axios.get('/api/users/user-info')
            setUser(response.data.name)
        }catch(e){
            console.log(e)
        }
    };
    fetchUserInfo()
},[])

  return (
    <>
      <Navbar/>
      <Banner user={user}/>
      <ScheduleInterview/>
      <Footer/>

    </>
  )
}

export default HomeStudent
