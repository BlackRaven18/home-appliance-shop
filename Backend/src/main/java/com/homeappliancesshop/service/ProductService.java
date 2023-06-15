package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Category;
import com.homeappliancesshop.model.Product;
import com.homeappliancesshop.repository.CategoryRepository;
import com.homeappliancesshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;


    public List<Product> findAllProducts() { return productRepository.findAll(); }

    public Optional<Product> findProductById(String productId){
        return productRepository.findById(productId);
    }
    public List<Product> findProductsByCategoryId(String categoryId){
        return productRepository.findByCategory_CategoryId(categoryId);
    }

    public Product getProductById(String productId){
        return productRepository.findById(productId).get();
    }
    public Product addProduct(Product product){
        return productRepository.save(product);
    }
    public String deleteProduct(String productId){
        productRepository.deleteById(productId);
        return productId + "product deleted from database";
    }

    public Product modifyProduct(Product newProduct){

        //Optional<Category> category = categoryRepository.findById(newProduct.getCategory().getCategoryId());
        Optional<Category> category = categoryRepository.findByName(newProduct.getCategory().getName());

        if(category.isPresent()){
            newProduct.setCategory(category.get());
        }

        //System.out.println(newProduct.getCategory().getName());
        return productRepository.save(newProduct);
    }
}