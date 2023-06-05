package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Category;
import com.homeappliancesshop.service.CategoryService;
import org.junit.jupiter.api.AfterAll;
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

class CategoryControllerTest {
    @InjectMocks
    private CategoryController categoryController;

    @Mock
    private CategoryService categoryService;

    @BeforeEach
    void setUp() { MockitoAnnotations.openMocks(this); }

    @AfterEach
    void clear() { reset(categoryService); }

    @Test
    void getCategories() {
        List<Category> expectedCategories = new ArrayList<>();
        when(categoryService.findAllCategories()).thenReturn(expectedCategories);

        List<Category> result = categoryController.getCategories();

        assertEquals(expectedCategories, result);
        verify(categoryService, times(1)).findAllCategories();
    }
}