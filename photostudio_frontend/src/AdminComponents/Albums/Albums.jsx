import React, { useEffect, useState } from 'react'
import { api, API_URL } from '../../usercomponents/config/api';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAlbums, getPublishedAlbums } from '../../usercomponents/State/ClientAlbums/Action';
import axios from 'axios';

export const Albums = () => {
  
   const jwt = localStorage.getItem("jwt");
  
  const dispatch =useDispatch();
  const {allAlbums} =useSelector((store)=>store);
  useEffect(()=>{
    dispatch(getAllAlbums(jwt));
   
  },[])
  
  
    const navigateToTab = (albumId) => {
        window.open(`/album/${albumId}`, "_blank"); // Opens in a new tab
      };

    const  deleteAlbum = async(albumId) => {
       try {
             
             const response =await axios.delete(`${API_URL}/admin/albums/${albumId}/delete`,{
                  headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            
            dispatch(getAllAlbums(jwt));
             alert(response.data);
             
           } catch (error) {
            alert("Album Deleted unSuccessfully!"+error);
             console.error("Error creating album:", error);
           }
    };

    const updateAlbum = (albumId) => {
      alert("Update Album Not Implemented!");
    };

  return (
    <div className="m-5 flex flex-col justify-center items-center  " >
        
        <header className='m-5 p-5 text-5xl font-serif tracking-wider'>
            Clients Albums
        </header>
        <div className="m-5 flex flex-wrap justify-center items-center gap-5">
        {allAlbums.allAlbums.map((data) => (
          <div
            key={data.albumId}
            className="card w-80 h-60 rounded-lg shadow-md overflow-hidden"
            style={{
              backgroundImage: `url(${data.images[1]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            
          >
            <div className="card-content flex  flex-col px-4 py-2 " >
              <div className='flex flex-row item-center pb-3'>  <h3 className="text-white text-lg font-bold" >{data.albumName}</h3>
              
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>updateAlbum(data.albumId)}>Update</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>navigateToTab(data.albumId)}>View →</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={()=>deleteAlbum(data.albumId)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
