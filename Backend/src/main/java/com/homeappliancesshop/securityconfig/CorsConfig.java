package com.homeappliancesshop.securityconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Dodaj tutaj adres URL Twojego klienta
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Dodaj tutaj obsługiwane metody HTTP
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
