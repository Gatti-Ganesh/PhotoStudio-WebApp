package com.studio.PhotoStudio_Backend.Service;

import static org.mockito.ArgumentCaptor.forClass;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.studio.PhotoStudio_Backend.Request.ContactUsFormRequest;

class ContactServiceTest {
	
	@InjectMocks
	private ContactService contactService;
	@Mock
	private JavaMailSender mailsender;
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void sendContactEmailTest() {
		
		ContactUsFormRequest req =new ContactUsFormRequest();
		req.setEmail("abc@gmail.com");
		req.setFirstName("abc");
		req.setLastName("d");
		req.setMessage("i need to contact you");
		req.setPhoneNumber("369258147");
		req.setSubject("contact you");
		contactService.sendContactEmail(req );
		
		var messageCaptor =forClass(SimpleMailMessage.class);
		verify(mailsender,times(1)).send(messageCaptor.capture());
		SimpleMailMessage capturedMessage = messageCaptor.getValue();
		System.out.println("cpture "+capturedMessage);
		Assertions.assertEquals("gatti.ganesh33372@gmail.com", capturedMessage.getTo()[0]);
		Assertions.assertEquals("abc@gmail.com", capturedMessage.getReplyTo());
		Assertions.assertEquals("contact you", capturedMessage.getSubject());
		Assertions.assertTrue(capturedMessage.getText().contains("i need to contact you"));
		Assertions.assertTrue(capturedMessage.getText().contains("369258147"));
		Assertions.assertTrue(capturedMessage.getText().contains("abc d"));
	}
	

}
