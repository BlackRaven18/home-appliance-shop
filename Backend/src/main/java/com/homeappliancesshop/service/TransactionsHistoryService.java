package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.repository.TransactionsHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionsHistoryService {

    private final TransactionsHistoryRepository repository;
    private final TransactionsService transactionsService;

    @Autowired
    public TransactionsHistoryService(TransactionsHistoryRepository repository, TransactionsService transactionsService) {
        this.repository = repository;
        this.transactionsService = transactionsService;
    }

    public TransactionsHistory addTransaction(String transactionHistoryId, Transaction transaction){
        TransactionsHistory transactionsHistory = repository.findById(transactionHistoryId).get();

        Transaction addedTransaction = transactionsService.addTransaction(transaction);
        transactionsHistory.getTransactions().add(addedTransaction);

        return repository.save(transactionsHistory);
    }

    public TransactionsHistory addTransactionsHistory(TransactionsHistory transactionsHistory){
        return repository.save(transactionsHistory);
    }

}
