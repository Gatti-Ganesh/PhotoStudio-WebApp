package com.studio.PhotoStudio_Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studio.PhotoStudio_Backend.Service.AlbumService;
import com.studio.PhotoStudio_Backend.Service.BookingService;
import com.studio.PhotoStudio_Backend.Service.BookingServiceImp;
import com.studio.PhotoStudio_Backend.Service.UserService;
import com.studio.PhotoStudio_Backend.entity.Album;
import com.studio.PhotoStudio_Backend.entity.Booking;
import com.studio.PhotoStudio_Backend.entity.User;

@RestController
@RequestMapping("/api")
public class BookingController {

	@Autowired
	private BookingService service;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BookingServiceImp bookingImp;
	
	@Autowired
	private AlbumService albumService;
	
	
	@GetMapping("/alluser/bookings")
	public ResponseEntity<List<Booking>> getAllBookings(){
		return ResponseEntity.ok(bookingImp.getAllBookings());
	}
	@GetMapping("user/bookings")
	public ResponseEntity<List<Booking>> getUserBookings(@RequestHeader("Authorization") String jwt) throws Exception{
		User user =userService.findUserByJwt(jwt);
		List<Booking> bookings=service.getUserBookings(user.getId());

		return ResponseEntity.ok(bookings);
	}
	
	@PostMapping("user/booking")
	public ResponseEntity<Booking> createBooking(@RequestBody Booking booking,@RequestHeader("Authorization") String jwt) throws Exception{
		System.out.println("controller for booking : "+jwt);
		User user =userService.findUserByJwt(jwt);
		return ResponseEntity.ok(service.createBooking(booking, user));
	}

	
	@GetMapping("/allusers")
	public ResponseEntity<List<User>> getAllUsers(){
		return ResponseEntity.ok(userService.getAllUsers());
	}
	
	@GetMapping("/user/bookings/{eventId}/album")
	public ResponseEntity<Album> getAlbumByBookingId(@PathVariable Long eventId,@RequestHeader("Authorization") String jwt){
		Album album =albumService.findAlbumByBookingEventId(eventId);
		return ResponseEntity.ok(album);
	}
}
