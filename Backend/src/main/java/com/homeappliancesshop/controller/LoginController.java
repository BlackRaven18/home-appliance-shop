package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class LoginController {

    @Autowired
    private PersonService personService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("login");
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Person person = personService.getPersonByEmail(email);

        if (person != null && passwordEncoder.matches(password, person.getPassword())) {

            String token = generateToken(person);
            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    private String generateToken(Person person) {
        String token = "";
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            KeyPair keyPair = keyPairGenerator.generateKeyPair();

            RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
            RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();

            Algorithm algorithm = Algorithm.RSA256(publicKey, privateKey);

            token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("personId", person.getPersonId())
                    .sign(algorithm);
        } catch (NoSuchAlgorithmException | JWTCreationException exception) {
            System.err.println("Cannot create JWT token for user: " + exception.getMessage());
        }
        return token;
    }

    private static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    private static class LoginResponse {
        private String token;

        public LoginResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}
