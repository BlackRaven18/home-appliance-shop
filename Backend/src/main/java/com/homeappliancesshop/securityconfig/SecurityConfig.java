package com.homeappliancesshop.securityconfig;

import com.homeappliancesshop.service.MongoAuthPersonService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    MongoAuthPersonService service;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager customAuthenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject
                (AuthenticationManagerBuilder.class);

        authenticationManagerBuilder.userDetailsService(service)
                .passwordEncoder(bCryptPasswordEncoder());

        return authenticationManagerBuilder.build();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) ->
                        requests
                                .requestMatchers("/", "/persons", "categories").permitAll()
                                .requestMatchers(HttpMethod.POST, "/persons/login").permitAll()
                                .requestMatchers(HttpMethod.GET, "/products").permitAll()
                                .requestMatchers(HttpMethod.GET, "/products/**").permitAll()
                                .requestMatchers( "/transactions/**").hasAuthority("ROLE_ADMIN")
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
