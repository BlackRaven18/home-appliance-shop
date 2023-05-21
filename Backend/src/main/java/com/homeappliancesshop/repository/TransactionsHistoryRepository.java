package com.homeappliancesshop.repository;

import com.homeappliancesshop.model.TransactionsHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionsHistoryRepository extends MongoRepository<TransactionsHistory, String> {

    TransactionsHistory findByPersonId(String personId);
}
