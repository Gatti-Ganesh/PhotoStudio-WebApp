import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate=useNavigate();
  return (
    <div>
    <section className="m-5 relative flex flex-col-reverse md:flex-row items-center justify-between h-80%">
      {/* Left Content */}
      <div className=" z-10  flex flex-col justify-center  bg-white text-black w-full md:w-1/3  col-5 p-8 md:p-16 text-left md:text-center ">
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
          John Michael
        </p>
        <h1 className=" text-4xl sm:text-xl md:text-4xl font-serif leading-tight">
          Photography <br /> Studio
        </h1>
        <button
              
              onClick={() => navigate('/services')}
              className="m-3 text-center border border-black p-2  hover:text-gray-300 transition "
            >
              Book Now
            </button>
      </div>

      {/* Right Image */}
      <div className="w-full  md:w-3/4 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/12999522/pexels-photo-12999522.jpeg?cs=srgb&dl=pexels-pok-rie-33563-12999522.jpg&fm=jpg" // Replace with your image URL
          alt="Hero"
          className="object-cover w-full h-full"
        />
      </div>
    </section>
    <footer className=" text-white py-4 px-8 flex flex-col justify-center md:flex-row justify-between items-center mt-5 pt-5">
    {/* Copyright Section */}
    <div className="text-sm text-gray-400">
      © 2035 by <span className="text-white">John Michael</span>. Powered and secured by <a href="#" className="text-blue-400 underline">Wix</a>.
    </div>

    {/* Social Media Links */}
    <div className="mt-4 item-center md:flex-row mt-0  space-x-6">
    
      <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
      <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
      <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
      <p  className="text-gray-400 hover:text-white transition">+91 6301245789</p>
    
    </div>
    
  </footer>
  </div>
  )
}
