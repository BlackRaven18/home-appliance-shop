package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.service.TransactionsHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/transactionsHistory")
public class TransactionsHistoryController {
    @Autowired
    private TransactionsHistoryService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionsHistory createTransaction(@RequestBody TransactionsHistory transaction){
        return service.addTransaction(transaction);
    }
}
