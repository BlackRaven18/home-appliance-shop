package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.Address;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends MongoRepository<Address, String> {

    //Query("SELECT a FROM Address a WHERE a.city = ?1")
    //Optional<Address> findByCity(String city);
}
