package com.studio.PhotoStudio_Backend.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Album {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long albumId;
	
	private String fullName;
	
	private String albumName;
	
	@ElementCollection
	@Column(length = 1000)
	private List<String> images;
	
	private Boolean publish;
	
	@OneToOne
    private Booking booking;
   
	
	public Album() {
		
	}

	public Album(Long albumId, String fullName, String albumName, List<String> images, Boolean publish,
			Booking booking) {
		super();
		this.albumId = albumId;
		this.fullName = fullName;
		this.albumName = albumName;
		this.images = images;
		this.publish = publish;
		this.booking = booking;
	}

	public Long getAlbumId() {
		return albumId;
	}

	public void setAlbumId(Long albumId) {
		this.albumId = albumId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public Boolean getPublish() {
		return publish;
	}

	public void setPublish(Boolean publish) {
		this.publish = publish;
	}

	public Booking getBooking() {
		return booking;
	}

	public void setBooking(Booking booking) {
		this.booking = booking;
	}

	public String getAlbumName() {
		return albumName;
	}

	public void setAlbumName(String albumName) {
		this.albumName = albumName;
	}

	

	@Override
	public String toString() {
		return "Album [albumId=" + albumId + ", fullName=" + fullName + ", albumName=" + albumName + ", images="
				+ images + ", publish=" + publish + ", booking=" + booking + "]";
	}
	
	
}
