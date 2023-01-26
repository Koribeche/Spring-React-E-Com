package com.example.Ecom.security.jwt;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Strings;
import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

@Transactional
public class JwtTokenVerifier extends OncePerRequestFilter {

    private final SecretKey secretKey;
    private final JwtConfig jwtConfig;

    public JwtTokenVerifier(SecretKey secretKey,
                            JwtConfig jwtConfig) {
        this.secretKey = secretKey;
        this.jwtConfig = jwtConfig;
    }

    @Override
    @Transactional
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

       if(request.getServletPath().equals("/login")){
            filterChain.doFilter(request, response);
       }
       else{
           String authorizationHeader = request.getHeader(jwtConfig.getAuthorizationHeader());

           if (Strings.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith(jwtConfig.getTokenPrefix())) {
               filterChain.doFilter(request, response);
               return;
           }
           try {
               String token = authorizationHeader.replace(jwtConfig.getTokenPrefix(), "");
               Algorithm algorithm = Algorithm.HMAC256(secretKey.getEncoded());
               JWTVerifier verifier = JWT.require(algorithm).build();
               DecodedJWT decodedJWT = verifier.verify(token);
               String username = decodedJWT.getSubject();
               String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
               Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
               Arrays.stream(roles).forEach(role -> {
                   authorities.add(new SimpleGrantedAuthority(role));
                });

               UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,null, authorities);
               SecurityContextHolder.getContext().setAuthentication(authenticationToken);
               // request.setAttribute("claims", decodedJWT.getClaims());
               // request.setAttribute("subject", decodedJWT.getSubject());

               filterChain.doFilter(request, response);
           } catch (JwtException e) {
               Map<String,String> error = new HashMap<>();
               error.put("error_message",e.getMessage());
               response.setContentType("application/json");
               response.setStatus(401);
               new ObjectMapper().writeValue(response.getOutputStream(),error);
           }

       }
    }
}