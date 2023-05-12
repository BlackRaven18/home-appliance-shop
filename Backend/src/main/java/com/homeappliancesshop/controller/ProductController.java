package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Product;
import com.homeappliancesshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping
    public List<Product> getProducts(){
        return service.findAllProducts();
    }

    @GetMapping("/{productId}")
    public Product getProduct(@PathVariable String productId){
        return service.getProductById(productId);
    }
}