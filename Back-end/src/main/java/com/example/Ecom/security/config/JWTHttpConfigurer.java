package com.example.Ecom.security.config;

import com.example.Ecom.security.jwt.JwtConfig;
import com.example.Ecom.security.jwt.JwtTokenVerifier;
import com.example.Ecom.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import javax.crypto.SecretKey;
import javax.transaction.Transactional;

@Component
@RequiredArgsConstructor
@Transactional
public class JWTHttpConfigurer extends AbstractHttpConfigurer<JWTHttpConfigurer, HttpSecurity> {

    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;




    @Override
    public void configure(HttpSecurity http) throws Exception {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userService);
        final AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
        http
                .addFilter(new JwtFilter(authenticationManager,jwtConfig,secretKey,userService))
                .addFilterAfter(new JwtTokenVerifier(secretKey, jwtConfig),JwtFilter.class)
                 .authenticationProvider(provider);
    }
}
