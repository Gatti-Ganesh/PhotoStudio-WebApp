package com.studio.PhotoStudio_Backend.Service;

import static org.hamcrest.CoreMatchers.any;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.studio.PhotoStudio_Backend.Repository.AlbumRepository;
import com.studio.PhotoStudio_Backend.entity.Album;
import com.studio.PhotoStudio_Backend.entity.Booking;
import com.studio.PhotoStudio_Backend.entity.USER_ROLE;
import com.studio.PhotoStudio_Backend.entity.User;

class AlbumServiceImpTest {

	@InjectMocks
	private AlbumServiceImp albumService;
	@Mock
	private BookingServiceImp bookingRepo;
	
	@Mock
	private AlbumRepository albumRepo;
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void createAlbumTest() throws Exception {
		
		List<String> images = null;
		User user=new User(12l, "abc", "d", "abc@gmail.com", "", null, USER_ROLE.ROLE_CUSTOMER);
		Booking booking = new Booking(1l, "abc", "d", "abc@gmail.com","9638527410", "weding", null, null, "address", "SHOTCOMPLETE", null, user);
		
		Mockito.when(bookingRepo.getById(1l)).thenReturn(Optional.of(booking));
		Album album =new Album(31l, "jan d", "weding", images, true,null);
		album.setBooking(booking);
		Album saveAlbum =new Album();
		saveAlbum.setAlbumName(album.getAlbumName());
		saveAlbum.setFullName(album.getFullName());
		saveAlbum.setPublish(album.getPublish());
		saveAlbum.setBooking(booking);
		Mockito.when(albumRepo.save(saveAlbum)).thenReturn(saveAlbum);
		albumService.createAlbum(1l, album);
		
		Mockito.when(bookingRepo.getById(2l)).thenReturn(Optional.empty());
		Exception exception =assertThrows(Exception.class, ()->albumService.createAlbum(2l, album));
		Assertions.assertEquals("Booking not found!", exception.getMessage());
	}
	
	@Test
	void getAllAlbumsTest() {
		Album album=new Album();
		List<Album> lis=Arrays.asList(album);
		Mockito.when(albumRepo.findAll()).thenReturn(lis);
		List<Album> res =albumService.getAllAlbums();
		Assertions.assertNotNull(res);
	}

	@Test
	void getAllPublishedAlbumsTest() {
		Album album=new Album();
		List<Album> lis=Arrays.asList(album);
		Mockito.when(albumRepo.getAllPublishAlbums()).thenReturn(lis);
		List<Album> res =albumService.getAllPublishedAlbums();
		Assertions.assertNotNull(res);
	}
	
	@Test
	void findAlbumByBookingEventIdTest() {
		User user=new User();
		Booking booking = new Booking(1l, "abc", "d", "abc@gmail.com","9638527410", "weding", null, null, "address", "SHOTCOMPLETE", null, user);
		Album album =new Album(31l, "jan d", "weding", null, true,booking);
		Mockito.when(albumRepo.findAlbumByBookingEventId(1l)).thenReturn(album);
		Album res= albumService.findAlbumByBookingEventId(1l);
		Assertions.assertNotNull(res);
		Assertions.assertEquals("jan d", res.getFullName());
		Assertions.assertEquals("weding", res.getAlbumName());
	}
}
