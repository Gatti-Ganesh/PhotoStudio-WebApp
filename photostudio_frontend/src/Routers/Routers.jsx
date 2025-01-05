import React from 'react'
import {Route, Routes, } from 'react-router-dom';
import { CustomerRoute } from './CustomerRoute';
import { AdminRoute } from './AdminRoute';
import { AlbumDetails } from '../usercomponents/ClientsAlbums/AlbumDetails';
import { MyAlbum } from '../usercomponents/Booking/MyAlbum';

export const Routers = () => {
  
  return (
    <Routes>
        <Route path='/*' element={<CustomerRoute/>}></Route>
        <Route path="/album/:albumId" element={<AlbumDetails />} />
        <Route path="/my-bookings/:eventId/album" element={<MyAlbum />} />
        <Route path='/admin/*' element={<AdminRoute/>}></Route>
    </Routes>
  )
}
