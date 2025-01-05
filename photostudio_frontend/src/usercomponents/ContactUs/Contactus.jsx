import React, { useState } from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { API_URL } from '../config/api';



export const Contactus = () => {
  const jwt =localStorage.getItem("jwt");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  
  const handleInputChange =  (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleContactUs = async(e) => {
    e.preventDefault();
    try{
        const response =await axios.post(`${API_URL}/contactus`, formValues);
      alert(response.data);
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
    }catch(error){
      console.error("Error sending contact message:", error);
      alert("Failed to send the message. Please try again.");
    }
    
  };
  return (
    <div className="m-5 flex flex-col items-center  " >
        
        <header className='m-5 p-5 text-5xl font-serif tracking-wider'>
            GET   IN   TOUCH
        </header>
         <div className=" flex flex-col-reverse lg:flex-row bg-white text-black p-10 m-10">
          {/* Left Section */}
            
           <div className="md:w-1/2 px-4  p-10 m-10">
              <h2 className="order-1 text-2xl font-semibold mb-6">
          For inquiries about sessions and pricing fill out the form and someone
          will get back to you.
               </h2>
                <p className=" mb-2 font-mono">500 Terry Francine Street</p>
                <p className="mb-2 font-mono">Andhra Pradesh, India 94158</p>
                <p className="mb-4 font-mono">info@mysite.com</p>
                <p className=" mb-4 font-mono">Tel: 123-456-7890</p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-6">
          <a href="#" className="text-black">
            <FacebookOutlinedIcon/>
          </a>
          <a href="#" className="text-black">
            <InstagramIcon/>
          </a>
          <a href="#" className="text-black">
            <YouTubeIcon/>
          </a>
        </div>
           </div>

          {/* Right Section */}
          <div className="lg:w-1/2 px-4 ml-10 p-10">
         <form onSubmit={handleContactUs}  className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-2">
              First name *
            </label>
            <input
              type="text"
              id="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2">
              Last name *
            </label>
            <input
              type="text"
              id="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div >
            <label htmlFor="email" className="block mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div >
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number *
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="subject" className="block mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formValues.subject}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={formValues.message}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded h-32"
            ></textarea>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
           </div>
         </div>
         
    
    </div>
  )
}
