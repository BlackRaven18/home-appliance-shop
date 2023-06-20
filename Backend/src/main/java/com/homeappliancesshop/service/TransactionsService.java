package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionsService {

    @Autowired
    private TransactionsRepository repository;


    public void acceptTransactionStatus(String transactionId){
        Optional<Transaction> transaction = repository.findById(transactionId);
        transaction.get().setStatus("manually-accepted");
        repository.save(transaction.get());
    }

    public Transaction addTransaction(Transaction transaction){
        return repository.save(transaction);
    }
}
