package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Address;
import com.homeappliancesshop.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AddressService {

    @Autowired
    private AddressRepository repository;


    //

    public Address addAddress(Address address){
        //address.setAddressId(UUID.randomUUID().toString().split("-")[0]);
        return repository.save(address);
    }
}
