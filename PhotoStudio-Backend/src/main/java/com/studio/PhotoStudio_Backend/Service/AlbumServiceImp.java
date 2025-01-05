package com.studio.PhotoStudio_Backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studio.PhotoStudio_Backend.Repository.AlbumRepository;
import com.studio.PhotoStudio_Backend.entity.Album;
import com.studio.PhotoStudio_Backend.entity.Booking;

@Service
public class AlbumServiceImp implements AlbumService{
	
	@Autowired
	private BookingServiceImp bookingRepo;
	
	@Autowired
	private AlbumRepository albumRepo;
	@Override
	public Album createAlbum(Long bookingId, Album album) throws Exception{
		Booking booking =bookingRepo.getById(bookingId).orElse(null);
		if(booking == null) {
			throw new Exception("Booking not found!");
		}
		String fullName=booking.getFirstName() +booking.getLastName();
		Album saveAlbum =new Album();
		saveAlbum.setFullName(fullName);
		saveAlbum.setAlbumName(album.getAlbumName());
		saveAlbum.setImages(album.getImages());
		saveAlbum.setBooking(booking);
		
		saveAlbum.setPublish(album.getPublish());
		
		return albumRepo.save(saveAlbum);
		
	}
	
	@Override
	public Album getAlbumBasedOnTheBookingId(Long bookingId) throws Exception{
		
		return null;
	}
	
	@Override
	public List<Album> getAllAlbums(){
		return albumRepo.findAll();
	}

	@Override
	public List<Album> getAllPublishedAlbums() {
		
		return albumRepo.getAllPublishAlbums();
	}

	@Override
	public Album findAlbumByBookingEventId(Long bookingEventId) {
		return albumRepo.findAlbumByBookingEventId(bookingEventId);
		
	}

}
