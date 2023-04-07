package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.User;
import com.homeappliancesshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<User> getUsers(){
        return service.findAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable String userId){
        return service.getUserById(userId);
    }
}
