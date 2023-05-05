package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.Person;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonRepository extends MongoRepository<Person, String> {
    Person findByEmail(String email);
}
