import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAlbums, getPublishedAlbums } from '../State/ClientAlbums/Action';
import { ViewAlbum } from '../Booking/ViewAlbum';

export const AlbumDetails = () => {
    const { albumId } = useParams();
    const dispatch =useDispatch();
  const {allAlbums} =useSelector((store)=>store);
  const jwt = localStorage.getItem("jwt");
  useEffect(()=>{
    dispatch(getAllAlbums())
  },[])
  const album = allAlbums.allAlbums.find((a) => a.albumId === parseInt(albumId));
  console.log("album : ",album);
  if (!album) {
    return (
          <div className="flex flex-col justify-center items-center h-screen m-5">
            <h1 className="text-3xl font-semibold text-white-500">Album not found!</h1>
            <p className="text-xl font-semibold text-gray-500">Please Contact to the Studio...</p>
          </div>
        );
  }
  return (
    <ViewAlbum album={album}/>
  )
}
