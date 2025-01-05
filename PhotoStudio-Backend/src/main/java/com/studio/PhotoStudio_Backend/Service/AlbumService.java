package com.studio.PhotoStudio_Backend.Service;

import java.util.List;

import com.studio.PhotoStudio_Backend.entity.Album;

public interface AlbumService {

	public Album createAlbum(Long bookingId,Album album)throws Exception;
	
	public Album getAlbumBasedOnTheBookingId(Long bookingId) throws Exception;
	
	public List<Album> getAllAlbums();
	
	public List<Album> getAllPublishedAlbums();
	
	public Album findAlbumByBookingEventId(Long bookingEventId);
}
