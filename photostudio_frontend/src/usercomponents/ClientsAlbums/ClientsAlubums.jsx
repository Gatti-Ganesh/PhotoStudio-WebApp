import React, { useEffect } from 'react'
import './card.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishedAlbums } from '../State/ClientAlbums/Action';

export const ClientsAlubums = () => {
    const dispatch =useDispatch();
  const {publishAlbums} =useSelector((store)=>store);
  useEffect(()=>{
    dispatch(getPublishedAlbums());
   
  },[])

  
    const navigateToTab = (albumId) => {
        window.open(`/album/${albumId}`, "_blank"); // Opens in a new tab
      };
  return (
    <div className="m-5 flex flex-col justify-center items-center  " >
        
        <header className='m-5 p-5 text-5xl font-serif tracking-wider'>
            Clients Albums
        </header>
        <div className="m-5 flex flex-wrap justify-center items-center gap-5">
        {publishAlbums.publishAlbums.map((data) => (
          <div
            key={data.albumId}
            className="card w-80 h-60 rounded-lg shadow-md overflow-hidden"
            style={{
              backgroundImage: `url(${data.images[1]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={()=>navigateToTab(data.albumId)}
          >
            <div className="card-content flex items-end px-4 py-2 " >
              <h3 className="text-white text-lg font-bold">{data.albumName}</h3>
              <span className="text-white text-xl">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
