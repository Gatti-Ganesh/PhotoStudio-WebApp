package com.studio.PhotoStudio_Backend.Configuration;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidater extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader=request.getHeader(JwtConstant.JWT_HEADER);

		if(authHeader != null && authHeader.startsWith("Bearer")) {
			String jwt=authHeader.substring(7);
			
			try {
				SecretKey key=Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
				
				Claims claims =Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
				
				String email= String.valueOf(claims.get("email"));
				
				String authorities =String.valueOf(claims.get("authorities"));
				
				List<GrantedAuthority> auth =AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
				
				Authentication authentication= new UsernamePasswordAuthenticationToken(email,null,auth);
				SecurityContextHolder.getContext().setAuthentication(authentication);
				
				
			}catch(Exception e) {
				System.err.println("Token validation error: " + e.getMessage());
				throw new BadCredentialsException("invalid token.....");
			}
		}
		
		filterChain.doFilter(request, response);
		
	}

}
