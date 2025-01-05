import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookings } from '../State/Booking/Action';
import { useNavigate } from 'react-router-dom';

export const formatTimeTo12Hour = (time24) => {
    if(time24){
        const [hours, minutes] = time24.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    }
  };

export const MyBookings = () => {
    const dispatch =useDispatch();
  const {auth,bookings} =useSelector((store)=>store);
  
  const jwt =localStorage.getItem("jwt");
  useEffect(()=>{
    dispatch(getUserBookings(jwt || auth.jwt))
  },[auth.jwt])

  const navigate =useNavigate();

const navigateToTab = (eventId) => {
    
    window.open(`my-bookings/${eventId}/album`, "_blank"); // Opens in a new tab
  };
  return (
    <div className="m-5 flex flex-col justify-center items-center  " >
        
        <header className='sm:text-xl m-5 p-5 text-5xl font-serif tracking-wider'>
            MY BOOKINGS
        </header>

        <div className="w-full max-w-4xl mx-auto p-6 bg-white text-black shadow-md rounded-md font-serif">
            {bookings.bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-100">
                    <th className="border border-gray-300 p-2">#</th>
                    <th className="border border-gray-300 p-2">Event Type</th>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Time</th>
                    <th className="border border-gray-300 p-2">Address</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Album</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.bookings.map((booking, index) => ( 
                    <tr className='hover:bg-gray-200' key={booking.eventId}>
                        <td className="border border-gray-300 p-2">{index+1}</td>
                        <td className="border border-gray-300 p-2">{booking.evnetType}</td>
                        <td className="border border-gray-300 p-2">{booking.eventDate}</td>
                        <td className="border border-gray-300 p-2">{formatTimeTo12Hour(booking.eventTime)}</td>
                        <td className="border border-gray-300 p-2">{booking.eventAddress}</td>
                        <td className="border border-gray-300 p-2">{booking.status}</td>
                        <td className="border border-gray-300 p-2"><button onClick={()=> navigateToTab(booking.eventId)} 
                                                                          disabled={!["EDITINGCOMPLETE", "OUT_FOR_DELIVERY", "DELIVERED"].includes(booking.status)}
                                                                            className={`${
                                                                                !["EDITINGCOMPLETE", "OUT_FOR_DELIVERY", "DELIVERED"].includes(booking.status)
                                                                                ? "bg-gray-500 cursor-not-allowed"
                                                                                : "bg-blue-500 hover:bg-blue-700"
                                                                            } text-white p-2 rounded`}>View Album</button></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
            </div>
    </div>
    
  
  )
}
