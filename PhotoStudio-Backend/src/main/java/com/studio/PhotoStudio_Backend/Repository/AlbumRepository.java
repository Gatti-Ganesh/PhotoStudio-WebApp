package com.studio.PhotoStudio_Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.studio.PhotoStudio_Backend.entity.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long>{

	List<Album> findByPublishTrue();

	@Query("SELECT a FROM Album a WHERE a.publish = true")
    public List<Album> getAllPublishAlbums();
	
	@Query("SELECT a FROM Album a WHERE a.booking.eventId =:bookingEventId")
	public Album findAlbumByBookingEventId(@Param("bookingEventId") Long bookingEventId);
    
	@Modifying
    @Query("UPDATE Album a SET a.booking = NULL WHERE a.albumId = :albumId")
    void detachBooking(@Param("albumId") Long albumId);
	
}
