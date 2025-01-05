package com.studio.PhotoStudio_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studio.PhotoStudio_Backend.Service.UserService;
import com.studio.PhotoStudio_Backend.entity.User;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/profile")
	public ResponseEntity<User> GetUserByJwt(@RequestHeader("Authorization") String jwt) throws Exception{
		User user =userService.findUserByJwt(jwt);
		return ResponseEntity.ok(user);
	}
}
