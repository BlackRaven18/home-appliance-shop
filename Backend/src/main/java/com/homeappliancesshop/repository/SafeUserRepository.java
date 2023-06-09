package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.SafeUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SafeUserRepository extends MongoRepository<SafeUser, String> {

    SafeUser findByUsername(String username);
}
