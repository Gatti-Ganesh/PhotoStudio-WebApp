package com.studio.PhotoStudio_Backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studio.PhotoStudio_Backend.Configuration.JwtProvider;
import com.studio.PhotoStudio_Backend.Repository.UserRepository;
import com.studio.PhotoStudio_Backend.entity.User;

@Service
public class UserServiceImp implements UserService{

	
	@Autowired
	private JwtProvider jwtProvider;
	
	@Autowired
	private UserRepository userRepo;
	@Override
	public User findUserByJwt(String jwt) throws Exception {
		String email =jwtProvider.getEmailFromJwtToken(jwt);
		User user=findUserByEmail(email);
		return user;
	}

	@Override
	public User findUserByEmail(String email) throws Exception {
		User user =userRepo.findByEmail(email);
		if(user == null) {
			throw new Exception("User Not Found!");
		}
		return user;
	}

	@Override
	public List<User> getAllUsers() {
		
		return userRepo.findAll();
	}

	
}
