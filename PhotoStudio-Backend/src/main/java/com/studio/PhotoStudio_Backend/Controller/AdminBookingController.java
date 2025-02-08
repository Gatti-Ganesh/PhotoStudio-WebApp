package com.studio.PhotoStudio_Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.studio.PhotoStudio_Backend.Service.AlbumService;
import com.studio.PhotoStudio_Backend.Service.BookingService;
import com.studio.PhotoStudio_Backend.entity.Album;
import com.studio.PhotoStudio_Backend.entity.Booking;

@RestController
@RequestMapping("/admin/bookings")
public class AdminBookingController {

	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private AlbumService albumService;
	
	@PutMapping("/booking/{bookingId}/{status}")
	public ResponseEntity<Booking> bookingStatusUpdate(@PathVariable Long bookingId,@PathVariable String status, @RequestHeader("Authorization") String jwt) throws Exception{
		Booking booking =bookingService.updtaeBookingStatus(bookingId, status);
		return ResponseEntity.ok(booking);
	}
	
	@PostMapping("/{bookingId}/album")
	public ResponseEntity<Album> createAlbum(@PathVariable Long bookingId, @RequestBody Album album,@RequestHeader("Authorization") String jwt) throws Exception{
		Album createAlbum = albumService.createAlbum(bookingId, album);
		return ResponseEntity.ok(createAlbum);
	}
	
	@GetMapping("/bookings")
	public ResponseEntity<List<Booking>> getBookingsByStatus(@RequestParam String status,@RequestHeader("Authorization") String jwt){
		List<Booking> bookings =bookingService.findByStatus(status);
		return ResponseEntity.ok(bookings);
	}
}
