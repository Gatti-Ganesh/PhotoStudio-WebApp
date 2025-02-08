package com.studio.PhotoStudio_Backend.Service;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doThrow;

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
import org.springframework.mail.javamail.JavaMailSender;

import com.studio.PhotoStudio_Backend.Repository.BookingRepository;
import com.studio.PhotoStudio_Backend.entity.Album;
import com.studio.PhotoStudio_Backend.entity.Booking;
import com.studio.PhotoStudio_Backend.entity.USER_ROLE;
import com.studio.PhotoStudio_Backend.entity.User;

class BookingServiceImpTest {

	@InjectMocks
	private BookingServiceImp bookingService;
	@Mock
	private BookingRepository bookingRepo;
	
	@Mock
	private JavaMailSender mailSender;
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}


	@Test
	public void getAllBookingsTest() {
		Album clientAlbum=new Album();
		User user=new User();
		Booking booking1 =new Booking(1l, "abc", "d", "abc@gmail.com", "6938527410", "Birthday", null, null, "hyd", "bookingSuccess", clientAlbum, user);
		List<Booking> lis=Arrays.asList(booking1);
		Mockito.when(bookingRepo.findAll()).thenReturn(lis);
		
		List<Booking> res =bookingService.getAllBookings();
		
		Assertions.assertEquals(1, res.size());
		Assertions.assertEquals("abc",res.get(0).getFirstName());
		Assertions.assertEquals("d", res.get(0).getLastName());
	}
	
	@Test
	public void getBookingByIdTest() {
		
		Optional<Booking> booking1 =Optional.empty();
	
		Mockito.when(bookingRepo.findById(1L)).thenReturn(booking1);
		Assertions.assertEquals(booking1, bookingService.getById(1l));
	}
	
	@Test
	public void updateBookingTest() {
		Album clientAlbum=new Album();
		User user=new User();
		Booking updateBooking =new Booking(2l, "efg", "d", "abc@gmail.com", "6938527410", "Birthday", null, null, "hyd", "bookingSuccess", clientAlbum, user);
		Optional<Booking> optinalbooking = Optional.ofNullable(new Booking(2l, "abc", "d", "abc@gmail.com", "6938527410", "Birthday", null, null, "hyd", "bookingSuccess", clientAlbum, user));;
		Mockito.when(bookingRepo.findById(2l)).thenReturn(optinalbooking);
		Booking booking =optinalbooking.get();
		Mockito.when(bookingRepo.save(booking)).thenReturn(updateBooking);
		Booking res=bookingService.updtaeBooking(2l, updateBooking);
		Assertions.assertNotNull(res);
		
		Mockito.when(optinalbooking.isPresent()).thenReturn(false);
		Booking res1=bookingService.updtaeBooking(3l, updateBooking);
		Assertions.assertNull(res1);

	}
	
	@Test
	public void deleteByIdTest() {
		
		bookingService.deleteBokingById(1l);
		doThrow(new RuntimeException("delete faild")).when(bookingRepo).deleteById(1l);
	}
	
	@Test
	public void getUserBookingsTest() {
		Album clientAlbum=new Album();
		User user=new User();
		Booking bokkings =new Booking(2l, "efg", "d", "abc@gmail.com", "6938527410", "Birthday", null, null, "hyd", "bookingSuccess", clientAlbum, user);
		List<Booking> lis =Arrays.asList(bokkings);
		
		Mockito.when(bookingRepo.findByUserId(1l)).thenReturn(lis);
		List<Booking>  res =bookingService.getUserBookings(1l);
		Assertions.assertNotNull(res);
	}
	
	@Test
	public void updtaeBookingStatusTest() throws Exception {
		String status="PANDING";
		Album clientAlbum=new Album();
		User user=new User();
		Booking booking =new Booking(2l, "efg", "d", "abc@gmail.com", "6938527410", "Birthday", null, null, "hyd", "bookingSuccess", clientAlbum, user);
		booking.setStatus(status);
		Mockito.when(bookingRepo.findById(2l)).thenReturn(Optional.of(booking));
		Mockito.when(bookingRepo.save(booking)).thenReturn(booking);
		Booking res=bookingService.updtaeBookingStatus(2l, status);
		Assertions.assertNotNull(booking);
		Assertions.assertNotNull(res);
		Assertions.assertEquals(status, res.getStatus());
		
		String status1="SHOTCOMPLETED";
		booking.setStatus(status1);
		Mockito.when(bookingRepo.save(booking)).thenReturn(booking);
		Booking res1=bookingService.updtaeBookingStatus(2l, status1);
		Assertions.assertEquals(status1, res1.getStatus());
		
		String status2="EDITINGCOMPLETE";
		booking.setStatus(status2);
		Mockito.when(bookingRepo.save(booking)).thenReturn(booking);
		Booking res2=bookingService.updtaeBookingStatus(2l, status2);
		Assertions.assertEquals(status2, res2.getStatus());
		
		String status3="OUT_FOR_DELIVERY";
		booking.setStatus(status3);
		Mockito.when(bookingRepo.save(booking)).thenReturn(booking);
		Booking res3=bookingService.updtaeBookingStatus(2l, status3);
		Assertions.assertEquals(status3, res3.getStatus());
		
		String status4="DELIVERED";
		booking.setStatus(status4);
		Mockito.when(bookingRepo.save(booking)).thenReturn(booking);
		Booking res4=bookingService.updtaeBookingStatus(2l, status4);
		Assertions.assertEquals(status4, res4.getStatus());
		
		String invalidstatus="WORNGSTATUS";
		Exception exception =assertThrows(Exception.class, ()->bookingService.updtaeBookingStatus(3l, invalidstatus));
		Assertions.assertEquals("Please Select a valid order status", exception.getMessage());
		
	}
	
	@Test
	public void createBookingTest() {
		String status="BOOKING SUCCESS";
		Album clientAlbum=new Album();
		User user=new User(12l, "abc", "d", "abc@gmail.com", "", null, USER_ROLE.ROLE_CUSTOMER);
		Booking booking =new Booking(2l, "efg", "d", "abc@gmail.com", "6938527410", "Birthday", null, null, "hyd", "BOOKING SUCCESS", clientAlbum, user);
		booking.setUser(user);
		booking.setStatus(status);
		Mockito.when(bookingRepo.save(booking)).thenReturn(booking);
		Booking res=bookingService.createBooking(booking, user);
		Assertions.assertNotNull(res);
		Assertions.assertEquals(status, res.getStatus());
	}
}
