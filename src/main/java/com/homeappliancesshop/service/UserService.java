package com.homeappliancesshop.service;

import com.homeappliancesshop.model.User;
import com.homeappliancesshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<User> findAllUsers(){
        return repository.findAll();
    }

    public User getUserById(String userId){
        return repository.findById(userId).get();
    }
}
