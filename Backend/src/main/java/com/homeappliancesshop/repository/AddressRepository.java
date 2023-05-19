package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.Address;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AddressRepository extends MongoRepository<Address, String> {
}