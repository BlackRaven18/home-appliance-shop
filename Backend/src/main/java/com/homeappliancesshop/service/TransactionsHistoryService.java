package com.homeappliancesshop.service;

import com.homeappliancesshop.model.ProductInTransaction;
import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.repository.TransactionsHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionsHistoryService {

    private final TransactionsHistoryRepository repository;

    @Autowired
    public TransactionsHistoryService(TransactionsHistoryRepository repository) {
        this.repository = repository;
    }

    public TransactionsHistory addTransaction(String transactionHistoryId, Transaction transaction){
        TransactionsHistory transactionsHistory = repository.findById(transactionHistoryId).get();

        transactionsHistory.addNewTransaction(transaction);

        return repository.save(transactionsHistory);
    }



}
