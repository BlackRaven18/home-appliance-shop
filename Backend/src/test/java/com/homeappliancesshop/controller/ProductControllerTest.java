package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Product;
import com.homeappliancesshop.model.Category;
import com.homeappliancesshop.service.ProductService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductControllerTest {
    @InjectMocks
    private ProductController productController;

    @Mock
    private ProductService productService;

    @BeforeEach
    void setUp() { MockitoAnnotations.openMocks(this); }

    @AfterEach
    void clear() { reset(productService); }

    @Test
    void getProducts() {
        List<Product> expectedProducts = new ArrayList<>();
        when(productService.findAllProducts()).thenReturn(expectedProducts);

        List<Product> result = productController.getProducts();

        assertEquals(expectedProducts, result);
        verify(productService, times(1)).findAllProducts();
    }

    @Test
    void getProduct() {
        String productId = "123";
        Product expectedProduct = new Product();
        when(productService.getProductById(productId)).thenReturn(expectedProduct);

        Product result = productController.getProduct(productId);

        assertEquals(expectedProduct, result);
        verify(productService, times(1)).getProductById(productId);
    }

    @Test
    void createProduct() {
        Product product = new Product();
        product.setProductId("123");
        product.setName("Asus Tuf Gaming A15");
        product.setPrice(1200.99);
        product.setColor("Black");
        product.setBrand("Asus");
        product.setImageURL("https://i.imgur.com/t0o2YPr.png");

        Category category = new Category();
        category.setName("Laptopy");
        product.setCategory(category);

        Product savedProduct = new Product();

        when(productService.addProduct(product)).thenReturn(savedProduct);

        Product result = productService.addProduct(product);

        verify(productService, times(1)).addProduct(product);
        assertEquals(savedProduct, result);
    }


    @Test
    void deleteProduct() {
        String productId = "123";
        when(productService.deleteProduct(productId)).thenReturn("Deleted");

        String result = productController.deleteProduct(productId);

        assertEquals("Deleted", result);
        verify(productService, times(1)).deleteProduct(productId);
    }

    @Test
    void updateProduct() {
        Product product = new Product();
        product.setProductId("123");

        Category category = new Category();
        category.setCategoryId("123");

        product.setCategory(category);
        Product updatedProduct = new Product();

        when(productService.modifyProduct(product)).thenReturn(updatedProduct);

        Product result = productController.updateProduct(product.getProductId(), product);

        verify(productService, times(1)).modifyProduct(product);
        assertEquals(updatedProduct, result);
    }
}