import React from 'react'

export const ViewAlbum = ({album}) => {
  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-center text-3xl font-bold py-4">{album.albumName}</h1>
      <div className="m-5 flex flex-wrap justify-center items-center gap-5">
        {album.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="w-auto h-auto md:max-w-3xl rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  )
}
