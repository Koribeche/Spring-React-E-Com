package com.example.Ecom.security.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.Ecom.security.jwt.JwtConfig;
import com.example.Ecom.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Transactional
public class JwtFilter extends UsernamePasswordAuthenticationFilter {

    final private AuthenticationManager authenticationManager;
    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;
    private final UserService userService;

    // @Value("${application.jwt.secretKey}")
    // private String secretKey;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {

            com.example.Ecom.model.User user = new ObjectMapper().readValue(request.getInputStream(), com.example.Ecom.model.User.class);
            String email = user.getEmail();
            String password = user.getPassword();

            log.info("email {} and password {} ", email, password);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
            return authenticationManager.authenticate(authenticationToken);
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        Map<String,String> error = new HashMap<>();
        error.put("error","Invalid username or password");

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        new ObjectMapper().writeValue(response.getOutputStream(),error);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {

        User user = (User) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256(secretKey.getEncoded());
        String access_token = JWT.create()
                .withSubject(user.getUsername())
                .withClaim("roles", user.getAuthorities().stream().map(grantedAuthority -> grantedAuthority.getAuthority()).collect(Collectors.toList()))
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtConfig.getAccessTokenExpirationTime()))
                // .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 10))
                .withIssuer(request.getRequestURL().toString())
                .sign(algorithm);

        // response.addHeader(jwtConfig.getAuthorizationHeader(), jwtConfig.getTokenPrefix() + access_token);
        // response.addHeader(jwtConfig.getAuthorizationHeader(), jwtConfig.getTokenPrefix() + refresh_token);


        Map<String,String> tokens = new HashMap<>();
        tokens.put("access_token",access_token);

        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getOutputStream(),tokens);


    }
}
