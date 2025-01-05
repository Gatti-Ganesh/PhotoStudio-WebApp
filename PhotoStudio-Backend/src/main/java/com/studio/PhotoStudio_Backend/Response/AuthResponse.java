package com.studio.PhotoStudio_Backend.Response;

import com.studio.PhotoStudio_Backend.entity.USER_ROLE;

public class AuthResponse {

	private String jwt;
	private String message;
	private USER_ROLE role;
	
	public USER_ROLE getRole() {
		return role;
	}
	public void setRole(USER_ROLE role) {
		this.role = role;
	}
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
