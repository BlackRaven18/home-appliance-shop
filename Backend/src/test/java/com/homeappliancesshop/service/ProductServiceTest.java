package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Category;
import com.homeappliancesshop.model.Product;
import com.homeappliancesshop.repository.CategoryRepository;
import com.homeappliancesshop.repository.ProductRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {
    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void clear() {
        reset(productRepository);
        reset(categoryRepository);
    }

    @Test
    void findAllProducts() {
        List<Product> products = new ArrayList<>();
        products.add(new Product());
        products.add(new Product());

        when(productRepository.findAll()).thenReturn(products);

        List<Product> result = productService.findAllProducts();

        assertEquals(products.size(), result.size());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void findProductById() {
        String productId = "123";
        Product product = new Product();
        product.setProductId(productId);

        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        Optional<Product> result = productService.findProductById(productId);
        assertEquals(Optional.of(product), result);
        verify(productRepository, times(1)).findById(productId);
    }

    @Test
    void getProductById() {
        String productId = "123";
        Product expectedProduct = new Product();
        expectedProduct.setProductId(productId);
        when(productRepository.findById(productId)).thenReturn(Optional.of(expectedProduct));

        Product actualProduct = productService.getProductById(productId);

        assertEquals(expectedProduct, actualProduct);
    }

    @Test
    void addProduct() {
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

        when(productRepository.save(product)).thenReturn(product);

        Product savedProduct = productService.addProduct(product);

        assertEquals(product, savedProduct);
        verify(productRepository).save(product);
    }

    @Test
    void deleteProduct() {
        String productId = "123";

        String result = productService.deleteProduct(productId);

        assertEquals(productId + "product deleted from database", result);
        verify(productRepository).deleteById(productId);
    }

    @Test
    void modifyProduct() {
        String categoryId = "category1";
        String productId = "product1";
        Category category = new Category(categoryId, "Electronics");
        Product existingProduct = new Product(productId, "TV", "LG", "Black", "Bardzo dobry telewizor", 1200.99, "https://i.imgur.com/szMo5sW.jpeg", category);
        Product modifiedProduct = new Product(productId, "Smart TV","LG", "Black", "Bardzo dobry telewizor", 1500.99, "https://i.imgur.com/szMo5sW.jpeg",  category);

        when(categoryRepository.findByName(category.getName())).thenReturn(Optional.of(category));
        when(productRepository.save(modifiedProduct)).thenReturn(modifiedProduct);

        Product result = productService.modifyProduct(modifiedProduct);

        assertEquals(modifiedProduct, result);
        verify(categoryRepository).findByName(category.getName());
        verify(productRepository).save(modifiedProduct);
    }
}