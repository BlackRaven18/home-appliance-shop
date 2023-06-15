package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TransactionService {
    private TransactionRepository repository;

//    public void acceptTransactionStatus(String transactionId){
//        Optional<Transaction> transaction = repository.findById(transactionId);
//        transaction.get().setStatus("succeeded");
//        repository.save(transaction.get());
//    }
}
