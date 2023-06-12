package com.homeappliancesshop.config;

import com.homeappliancesshop.service.MongoAuthSafeUserDetailService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.web.client.HttpClientErrorException;

import java.io.IOException;
import java.io.PrintWriter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    MongoAuthSafeUserDetailService service;



    @Bean
    public AuthenticationManager customAuthenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject
                (AuthenticationManagerBuilder.class);

        authenticationManagerBuilder.userDetailsService(service)
                .passwordEncoder(bCryptPasswordEncoder());

        return authenticationManagerBuilder.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) ->
                        requests
                                .requestMatchers("/", "/persons", "categories").permitAll()
                                .requestMatchers(HttpMethod.POST, "/persons/login").permitAll()
                                .requestMatchers(HttpMethod.GET, "/products").permitAll()
                                .requestMatchers("admin/login").hasAuthority("ROLE_ADMIN")
                                .anyRequest().authenticated()
                //.anyRequest().permitAll()
        );

        http
                .csrf().disable()
                .cors()
                .and()
                .formLogin()
                .and()
                .httpBasic()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid credentials");
                });


        return http.build();
    }



}
