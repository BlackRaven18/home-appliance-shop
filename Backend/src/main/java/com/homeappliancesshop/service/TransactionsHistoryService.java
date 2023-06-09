package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.model.ProductInTransaction;
import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.repository.PersonRepository;
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

    public List<TransactionsHistory> findAllTransactionsHistory() {
        return repository.findAll();
    }

    public TransactionsHistory getTransactionsHistoryById(String transactionId) {
        return repository.findById(transactionId).orElse(null);
    }

    public TransactionsHistory updateTransactionsHistoryStatus(String transactionId, String newStatus) {
        TransactionsHistory existingTransactionsHistory = repository.findById(transactionId).orElse(null);
        if (existingTransactionsHistory != null) {
            existingTransactionsHistory.setStatus(newStatus);
            return repository.save(existingTransactionsHistory);
        }
        return null;
    }

    public TransactionsHistory addTransaction(String transactionHistoryId, Transaction transaction) {
        TransactionsHistory transactionsHistory = repository.findById(transactionHistoryId).orElse(null);

        if (transactionsHistory != null) {
            transactionsHistory.addNewTransaction(transaction);
            return repository.save(transactionsHistory);
        }

        return null;
    }

    public TransactionsHistory addTransactionsHistory(TransactionsHistory transactionsHistory) {
        return repository.save(transactionsHistory);
    }
}

