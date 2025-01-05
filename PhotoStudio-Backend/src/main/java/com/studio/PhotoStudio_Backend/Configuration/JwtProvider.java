package com.studio.PhotoStudio_Backend.Configuration;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {

	private SecretKey key= Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
	
	public String generateToken(Authentication auth) {
		Collection<? extends GrantedAuthority> authorities =auth.getAuthorities();
		
		String roles =populateAuthorities(authorities);
		
		String jwt=Jwts.builder()
				.claim("email", auth.getName())
				.claim("authorities", roles)
				.setSubject(auth.getName())
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime()+43200000))  //12h 
				.signWith(key,SignatureAlgorithm.HS512)
				.compact();
		
		return jwt;
	}
	
	
	public String getEmailFromJwtToken(String jwt) {
		System.out.println("jwt : "+jwt);
		jwt=jwt.substring(7);
		Claims claims =Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		
		String email= String.valueOf(claims.get("email"));
		return email;
	}
	
	 //Extract roles/authorities from JWT
    public Set<String> getRolesFromJwtToken(String jwt) {
        jwt = jwt.substring(7);  // Remove 'Bearer ' prefix
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        
        String roles = (String) claims.get("authorities");  // Extract roles from claims
        return new HashSet<>(Arrays.asList(roles.split(",")));  // Convert CSV to Set of roles
    }
    
	private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
		Set<String> auths =new HashSet<>();
		
		for(GrantedAuthority authority:authorities) {
			auths.add(authority.getAuthority());
		}
		
		return String.join(",", auths);
	}
}
