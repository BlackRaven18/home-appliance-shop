package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Category;
import com.homeappliancesshop.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public List<Category> findAllCategories(){
        return repository.findAll();
    }
}
