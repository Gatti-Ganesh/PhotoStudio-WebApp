package com.studio.PhotoStudio_Backend.Service;

import java.util.List;

import com.studio.PhotoStudio_Backend.entity.Booking;
import com.studio.PhotoStudio_Backend.entity.User;

public interface BookingService {

	public Booking createBooking(Booking booking, User user);
	
	public List<Booking> getUserBookings(Long userId);
	
	public Booking updtaeBookingStatus(Long bookingId,String status) throws Exception;
	
	public List<Booking> findByStatus(String status);
}
