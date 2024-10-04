import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserDetail from '../components/UserDetail'

const Profile = () => {
  return (
    <>
      <Navbar/>
      <div className='w-full bg-[#222831] py-20 '>
      <UserDetail />
      </div>
      
      <Footer/>

    </>
  )
}

export default Profile