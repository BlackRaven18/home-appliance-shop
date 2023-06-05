package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByEmail(String email);
}