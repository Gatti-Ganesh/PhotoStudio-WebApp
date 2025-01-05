package com.studio.PhotoStudio_Backend.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long eventId;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String phoneNumber;
	

	private String evnetType;
	
	private LocalDate eventDate;
	
	private LocalTime eventTime;
	
	private String eventAddress;
	
	private String status;
	@JsonIgnore
	@OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Album clientAlbum;

	@ManyToOne
	private User user;
	
	public Booking() {
		
	}

	public Booking(Long eventId, String firstName, String lastName, String email, String phoneNumber, String evnetType,
			LocalDate eventDate, LocalTime eventTime, String eventAddress, String status, Album clientAlbum,
			User user) {
		super();
		this.eventId = eventId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.evnetType = evnetType;
		this.eventDate = eventDate;
		this.eventTime = eventTime;
		this.eventAddress = eventAddress;
		this.status = status;
		this.clientAlbum = clientAlbum;
		this.user = user;
	}

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	

	public String getEvnetType() {
		return evnetType;
	}

	public void setEvnetType(String evnetType) {
		this.evnetType = evnetType;
	}

	public LocalDate getEventDate() {
		return eventDate;
	}

	public void setEventDate(LocalDate eventDate) {
		this.eventDate = eventDate;
	}

	public LocalTime getEventTime() {
		return eventTime;
	}

	public void setEventTime(LocalTime eventTime) {
		this.eventTime = eventTime;
	}

	public String getEventAddress() {
		return eventAddress;
	}

	public void setEventAddress(String eventAddress) {
		this.eventAddress = eventAddress;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	public Album getClientAlbum() {
		return clientAlbum;
	}

	public void setClientAlbum(Album clientAlbum) {
		this.clientAlbum = clientAlbum;
	}
	

	

	@Override
	public String toString() {
		return "Booking [eventId=" + eventId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", phoneNumber=" + phoneNumber + ", evnetType=" + evnetType + ", eventDate=" + eventDate
				+ ", eventTime=" + eventTime + ", eventAddress=" + eventAddress + ", status=" + status
				+ ", clientAlbum=" + clientAlbum + ", user=" + user + "]";
	}
	
	
	
}
