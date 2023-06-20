package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionsRepository extends MongoRepository<Transaction, String> {
}
