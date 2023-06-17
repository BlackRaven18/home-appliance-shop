package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.service.TransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/transactions")
public class TransactionsController {

    @Autowired
    private TransactionsService service;

    @PostMapping("/{transactionId}/accept")
    public void acceptTransactionStatus(@PathVariable String transactionId){
        service.acceptTransactionStatus(transactionId);
    }


}
