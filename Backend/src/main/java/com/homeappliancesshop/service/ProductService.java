package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Product;
import com.homeappliancesshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ProductService {

    @Autowired
    private ProductRepository repository;

    public List<Product> findAllProducts() { return repository.findAll(); };

    public Product getProductById(String productId){
        return repository.findById(productId).get();
    }


}
