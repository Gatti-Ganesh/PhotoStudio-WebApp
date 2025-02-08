package com.studio.PhotoStudio_Backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studio.PhotoStudio_Backend.Repository.AlbumRepository;
import com.studio.PhotoStudio_Backend.entity.Album;
import com.studio.PhotoStudio_Backend.entity.Booking;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class AlbumServiceImp implements AlbumService{
	
	@Autowired
	private BookingServiceImp bookingRepo;
	@PersistenceContext
    private EntityManager entityManager;
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

	
	@Override
	public boolean deleteAlbum(Long albumId) {
		Optional<Album> albumOptional = albumRepo.findById(albumId);
		if (albumOptional.isPresent()) {
	        Album album = albumOptional.get();
	        //albumRepo.detachBooking(albumId);
	        //  Break the relationship with Booking before deleting
	        album.setBooking(null);
	        albumRepo.save(album); // Save changes first
	     // 🔹 Flush changes to the database to clear persistence context
	        entityManager.flush();  // Ensure the update is committed
	        entityManager.clear();
	        albumRepo.deleteById(albumId); // Now delete safely
	        return true;
	    }else {
			return false;
		}
		
	}

}
