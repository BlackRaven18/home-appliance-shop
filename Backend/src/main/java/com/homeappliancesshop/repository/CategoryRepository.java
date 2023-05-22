package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category, String> {

    Optional<Category> findByName(String name);
}
