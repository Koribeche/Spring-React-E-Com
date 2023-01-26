package com.example.Ecom.security.config;

import com.example.Ecom.security.jwt.JwtConfig;
import com.example.Ecom.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.SecretKey;
import javax.transaction.Transactional;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
@Transactional
public class ApplicationSecurityConfig {

    private final PasswordEncoder passwordEncoder;
    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;
    private final UserService userService;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.
                csrf().disable()
                .cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .apply(new JWTHttpConfigurer(jwtConfig,secretKey,userService,passwordEncoder))
                .and()
                .authorizeHttpRequests((authz) -> authz
                        .antMatchers("/", "index", "/css/*", "/js/*").permitAll()
                        // .antMatchers("/api/v1/student/addUser/**","/api/v1/student/token/refresh/**").hasAnyAuthority("ROLE_ADMIN")
                        // .antMatchers("/api/v1/student/**").hasAnyAuthority("ROLE_USER")
                        .anyRequest().permitAll()

                );
        return http.build();
    }

}
