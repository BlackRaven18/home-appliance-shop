package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
}