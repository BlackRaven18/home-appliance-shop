package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
