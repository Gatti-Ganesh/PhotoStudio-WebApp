package com.studio.PhotoStudio_Backend.Service;

import java.util.List;

import com.studio.PhotoStudio_Backend.entity.User;


public interface UserService {
   
	public User findUserByJwt(String jwt) throws Exception;
	
	public User findUserByEmail(String email) throws Exception;
	
	public List<User> getAllUsers();
}
