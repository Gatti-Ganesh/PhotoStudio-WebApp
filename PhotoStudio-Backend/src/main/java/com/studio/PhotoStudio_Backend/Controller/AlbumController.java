package com.studio.PhotoStudio_Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studio.PhotoStudio_Backend.Service.AlbumService;
import com.studio.PhotoStudio_Backend.entity.Album;

@RestController
@RequestMapping()
public class AlbumController {

	@Autowired
	private AlbumService albumService;
	
	@PostMapping("/admin/booking/{bookingId}/album/addAlbum")
	public ResponseEntity<Album> createAlbum(@PathVariable Long bookingId, @RequestBody Album album,@RequestHeader("Authorization") String jwt) throws Exception{
		Album createAlbum = albumService.createAlbum(bookingId, album);
		return ResponseEntity.ok(createAlbum);
	}
	
	@GetMapping("/albums")
	public ResponseEntity<List<Album>> getAllAlbums(){
		List<Album> allAlbums=albumService.getAllAlbums();
		return ResponseEntity.ok(allAlbums);
	}
	
	@GetMapping("/publish/albums")
	public ResponseEntity<List<Album>> getAllPublishAlbums(){
		List<Album> publishAlbums =albumService.getAllPublishedAlbums();
		return ResponseEntity.ok(publishAlbums);
		
	}
	
	@DeleteMapping("/admin/albums/{albumId}/delete")
	public ResponseEntity<String> deleteAlbumById(@PathVariable Long albumId, @RequestHeader("Authorization") String jwt) {
		boolean deleted= albumService.deleteAlbum(albumId);
		if (deleted) {
	        return ResponseEntity.ok("Album Deleted Successfully!");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Album Not Found!");
	    }
	}
	
	
}
