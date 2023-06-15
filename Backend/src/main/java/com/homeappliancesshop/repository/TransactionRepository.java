package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.Product;
import com.homeappliancesshop.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
}
