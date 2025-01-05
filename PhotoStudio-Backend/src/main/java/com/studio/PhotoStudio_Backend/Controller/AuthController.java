package com.studio.PhotoStudio_Backend.Controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.studio.PhotoStudio_Backend.Configuration.JwtProvider;
import com.studio.PhotoStudio_Backend.Repository.UserRepository;
import com.studio.PhotoStudio_Backend.Request.LoginRequest;
import com.studio.PhotoStudio_Backend.Response.AuthResponse;
import com.studio.PhotoStudio_Backend.Service.CustomerUserDetailsService;
import com.studio.PhotoStudio_Backend.entity.USER_ROLE;
import com.studio.PhotoStudio_Backend.entity.User;

@Controller
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtProvider jwtProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private CustomerUserDetailsService customerUserDetailsService;
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> CreateUser(@RequestBody User user) throws Exception {
		
		User isEmailExist =userRepo.findByEmail(user.getEmail());
	   
		if(isEmailExist != null) {
			throw new Exception("Email is already used with another account!");
		}
		
		User createdUser =new User();
		createdUser.setFirstName(user.getFirstName());
		createdUser.setLastName(user.getLastName());
		createdUser.setEmail(user.getEmail());
		createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
		createdUser.setRole(user.getRole() ==null ? USER_ROLE.ROLE_CUSTOMER:user.getRole());
		System.out.println("create User : "+createdUser);
		User savedUser =userRepo.save(createdUser);
		System.out.println("saved User : "+savedUser);
		System.out.println("authentication : "+authenticationManager);
		Authentication authentication =authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
		System.out.println("authontication -63 : "+authentication);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		System.out.println("before Creationjwt : 65");
		String jwt =jwtProvider.generateToken(authentication);
		System.out.println("jwt : "+jwt);
		AuthResponse authResponse =new AuthResponse();
		authResponse.setJwt(jwt);
		authResponse.setMessage("Registration Success");
		authResponse.setRole(savedUser.getRole());
		return new ResponseEntity<>(authResponse,HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest req){
		System.out.println("Login method colling");
		String userName =req.getEmail();
		String password =req.getPassword();
		
		Authentication authentication =authenticate(userName,password);
		Collection<? extends GrantedAuthority> authorities =authentication.getAuthorities();
		String role =authorities.isEmpty()?null:authorities.iterator().next().getAuthority();
		
		String jwt = jwtProvider.generateToken(authentication);
		System.out.println("login Jwt: "+jwt);
		AuthResponse authResponse=new AuthResponse();
		authResponse.setJwt(jwt);
		authResponse.setMessage("Login Success!");
		authResponse.setRole(USER_ROLE.valueOf(role));
		return new ResponseEntity<>(authResponse,HttpStatus.OK);
	}

	private Authentication authenticate(String userName, String password) {
		
		UserDetails userDetails =customerUserDetailsService.loadUserByUsername(userName);
		
		if(userDetails == null) {
			throw new BadCredentialsException("Invalid UserName....");
			
		}
		
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password....");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}
