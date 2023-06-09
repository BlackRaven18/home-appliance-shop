package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.service.TransactionsHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/transactions_history")
public class TransactionsHistoryController {

    @Autowired
    private TransactionsHistoryService service;

    @GetMapping
    public List<TransactionsHistory> getTransactionsHistory() {
        return service.findAllTransactionsHistory();
    }

    @GetMapping("/{transactionId}")
    public TransactionsHistory getTransactionsHistoryById(@PathVariable String transactionId) {
        return service.getTransactionsHistoryById(transactionId);
    }

    @PutMapping(value="/{transactionId}")
    public TransactionsHistory updateTransaction(@PathVariable String transactionId, @RequestBody Transaction newTransaction) {
        return service.updateTransactionsHistoryStatus(transactionId, newTransaction.getStatus());
    }
}
