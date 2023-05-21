package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.service.TransactionsHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/history")
public class TransactionsHistoryController {

    @Autowired
    private TransactionsHistoryService service;

    @GetMapping
    public TransactionsHistory getTransactionsHistory(){
        return service.getTransactionsHistoryByPersonId("mietek");
    }
}
