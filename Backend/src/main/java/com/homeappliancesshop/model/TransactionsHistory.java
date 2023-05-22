package com.homeappliancesshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "transactions_history")
@Data
@NoArgsConstructor
public class TransactionsHistory {
    @Id
    private String transactionId;
    private ArrayList<Transaction> transactions;

    public void addNewTransaction(Transaction transaction){
        transactions.add(transaction);
    }

}
