import React, { useEffect } from 'react'
import { ViewAlbum } from './ViewAlbum'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findAlbumByBookingEventId } from '../State/Booking/Action';

export const MyAlbum = () => {
    const { eventId } = useParams();
    const dispatch =useDispatch();
  const {auth,albumByEventId} =useSelector((store)=>store);
  
  const jwt =localStorage.getItem("jwt");
  useEffect(()=>{
    dispatch(findAlbumByBookingEventId({eventId,jwt}));
   
  },[auth.jwt])
 
  const album = albumByEventId.albumByEventId;
  
  if ((album === null) || (album === "")) {
    return (
    <div className="flex flex-col justify-center items-center h-screen m-5">
      <h1 className="text-3xl font-semibold text-white-500">Album not found!</h1>
      <p className="text-xl font-semibold text-gray-500">Please Contact to the Studio...</p>
    </div>);
  }
  return (
    <ViewAlbum album={album}/>
  )
}
