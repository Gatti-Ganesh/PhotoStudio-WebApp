package com.studio.PhotoStudio_Backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.studio.PhotoStudio_Backend.Request.ContactUsFormRequest;

@Service
public class ContactService {

	@Autowired
    private JavaMailSender mailsender;
	
	public void sendContactEmail(ContactUsFormRequest req) {
		
		SimpleMailMessage msg =new SimpleMailMessage();
		System.out.println("user Email : "+req.getEmail());
		//msg.setFrom(req.getEmail());
		msg.setTo("gatti.ganesh33372@gmail.com");
		msg.setReplyTo(req.getEmail());
		msg.setSubject(req.getSubject());
		msg.setText(
				"You have recived a new message from "+req.getFirstName()+" "+req.getLastName()+
				"\n\nMessage : "+req.getMessage()+
				"\n\nContactEmail : "+req.getEmail()+
				"\n\nContactPhone : "+req.getPhoneNumber()
				
				);
		mailsender.send(msg);
	}
	
}
