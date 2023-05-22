package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Product;
import com.homeappliancesshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product createProduct(@RequestBody Product product){
        return service.addProduct(product);
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable String productId){
        return service.deleteProduct(productId);
    }

    @PutMapping(value="/{productId}")
    public Product updateProduct(@PathVariable String productId, @RequestBody Product newProduct){

        System.out.println(newProduct);

        System.out.println(newProduct.getCategory().getCategoryId());

        //return newProduct;
        return service.modifyProduct(newProduct);
    }
}