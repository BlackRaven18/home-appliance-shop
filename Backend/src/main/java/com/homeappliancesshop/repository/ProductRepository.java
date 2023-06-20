package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByCategory_CategoryId(String categoryId);
}
