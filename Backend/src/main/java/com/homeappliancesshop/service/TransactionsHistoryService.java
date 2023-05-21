package com.homeappliancesshop.service;

import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.repository.TransactionsHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionsHistoryService {

    private final TransactionsHistoryRepository repository;

    @Autowired
    public TransactionsHistoryService(TransactionsHistoryRepository repository) {
        this.repository = repository;
    }

    public TransactionsHistory getTransactionsHistoryByPersonId(String personId){
        return repository.findByPersonId(personId);
    }


}
