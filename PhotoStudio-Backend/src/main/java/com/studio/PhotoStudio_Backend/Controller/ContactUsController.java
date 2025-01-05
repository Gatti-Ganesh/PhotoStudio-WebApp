package com.studio.PhotoStudio_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studio.PhotoStudio_Backend.Request.ContactUsFormRequest;
import com.studio.PhotoStudio_Backend.Service.ContactService;

@RestController
@RequestMapping("/contactus")
public class ContactUsController {

	@Autowired
	private ContactService service;
	@PostMapping()
	public ResponseEntity<String> sendContactEmail(@RequestBody ContactUsFormRequest req){
		System.out.println("send contact method calling");
		service.sendContactEmail(req);
		return ResponseEntity.ok("Message sent SuccessFuly!");
	}
}
