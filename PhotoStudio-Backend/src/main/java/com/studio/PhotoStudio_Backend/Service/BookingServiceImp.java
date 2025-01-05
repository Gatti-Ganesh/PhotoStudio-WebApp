package com.studio.PhotoStudio_Backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.studio.PhotoStudio_Backend.Repository.BookingRepository;
import com.studio.PhotoStudio_Backend.entity.Booking;
import com.studio.PhotoStudio_Backend.entity.User;

@Service
public class BookingServiceImp implements BookingService{

	@Autowired
	private BookingRepository bookingRepo;
	
	@Autowired
	private JavaMailSender mailSender;
	public List<Booking> getAllBookings(){
		return bookingRepo.findAll();
	}
	
	public Optional<Booking> getById(Long id) {
		return bookingRepo.findById(id);
	}
	
	
	public Booking updtaeBooking(Long id,Booking updateBooking) {
		
		Optional<Booking> optionalBooking =bookingRepo.findById(id);
		if(optionalBooking.isPresent()) {
			Booking booking =optionalBooking.get();
			
			booking.setFirstName(updateBooking.getFirstName());
			booking.setLastName(updateBooking.getLastName());
			booking.setEmail(updateBooking.getEmail());
			booking.setPhoneNumber(updateBooking.getPhoneNumber());
			booking.setEvnetType(updateBooking.getEvnetType());
			booking.setEventDate(updateBooking.getEventDate());
			booking.setEventTime(updateBooking.getEventTime());
			booking.setEventAddress(updateBooking.getEventAddress());
			return bookingRepo.save(booking);
		}
		return null;
	}
	
	public void deleteBokingById(Long id) {
		bookingRepo.deleteById(id);
	}

	@Override
	public Booking createBooking(Booking booking, User user) {
		booking.setUser(user);
		booking.setStatus("BOOKING SUCCESS");
		Booking savedBooking =bookingRepo.save(booking);
		SimpleMailMessage msg =new SimpleMailMessage();
		if(savedBooking != null) {
			
			msg.setFrom("gatti.ganesh33372@gmail.com");
			msg.setTo(savedBooking.getEmail());
			msg.setSubject("Booking Conformation : "+savedBooking.getEvnetType());
			String emailBody = "Dear " + savedBooking.getFirstName() + " " + savedBooking.getLastName() + ",\n\n" +
	                "Thank you for booking with us! We are delighted to confirm your booking details as follows:\n\n" +
	                "Booking Details:\n" +
	                "- Event Name/Type: " + savedBooking.getEvnetType() + "\n" +
	                "- Date: " + savedBooking.getEventDate() + "\n" +
	                "- Time: " + savedBooking.getEventTime() + "\n" +
	                "- Address: " + savedBooking.getEventAddress() + "\n\n" +
	                "Contact Information:\n" +
	                "- Name: " + savedBooking.getFirstName() + " " + savedBooking.getLastName() + "\n" +
	                "- Email: " + savedBooking.getEmail() + "\n" +
	                "- Phone Number: " + savedBooking.getPhoneNumber() + "\n\n" +
	                "If you have any questions or need to make changes to your booking, feel free to reach out to us at support@example.com.\n\n" +
	                "We look forward to making your event special!\n\n" +
	                "Warm regards,\n" +
	                "PhotoStudio";
			msg.setText(emailBody);
			mailSender.send(msg);
		}
		
		return savedBooking;
	}

	@Override
	public List<Booking> getUserBookings(Long userId) {
		
		return bookingRepo.findByUserId(userId);
	}

	@Override
	public Booking updtaeBookingStatus(Long bookingId, String status) throws Exception {
		Booking booking =bookingRepo.findById(bookingId).orElse(null);
		if(booking != null && (status.equals("PANDING") || status.equals("SHOTCOMPLETED") || status.equals("EDITINGCOMPLETE") || status.equals("OUT_FOR_DELIVERY") || status.equals("DELIVERED"))) {
			booking.setStatus(status);
			return bookingRepo.save(booking);
		}
		throw new Exception("Please Select a valid order status");
	}
}
