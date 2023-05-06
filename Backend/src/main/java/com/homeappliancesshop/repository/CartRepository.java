package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart, String>{
}
