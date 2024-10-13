import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <div className="bg-gray-800 text-yellow-300 min-h-screen  items-center"> {/* Dark theme with yellow text */}
        <Navbar className="w-screen"/> {/* Changed to w-screen for full viewport width */}
        <div className='flex flex-col items-center pb-10'>
        <h1 className="text-5xl font-bold text-center mt-10">About Us</h1> {/* Title styling */}
        <p className="text-center mt-4 text-lg max-w-2xl">We are a team of passionate individuals dedicated to creating a seamless and efficient interview scheduling experience. Our goal is to simplify the process for both interviewers and candidates, making it easier for everyone to connect and find the right fit.</p> {/* Description styling */}
        
        <section className="mt-10 px-4 w-full max-w-4xl"> {/* Margin and padding for the team section */}
            <h2 className="text-4xl font-semibold text-center mb-6">Our Team</h2>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6"> {/* Co-founders section styling */}
                <h3 className="text-3xl font-semibold">Co-founders</h3>
                <p className="mt-2">Swapnabir Dutta - CEO: Swapnabir has over 10 years of experience in the tech industry, leading innovative projects.</p> {/* Co-founder info */}
                <p className="mt-2">Vishal Gupta - CTO: Vishal is a tech visionary with a passion for developing cutting-edge solutions.</p> {/* Co-founder info */}
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg"> {/* Investors section styling */}
                <h3 className="text-3xl font-semibold">Investors</h3>
                <p className="mt-2">Venture Capital Group - A leading investment firm focused on technology startups.</p> {/* Investor info */}
                <p className="mt-2">Angel Investor Network - A network of angel investors supporting early-stage companies.</p> {/* Investor info */}
            </div>
        </section>
        </div>
        

        <Footer className="w-screen"/> {/* Changed to w-screen for full viewport width */}
    </div>
  )
}

export default About
