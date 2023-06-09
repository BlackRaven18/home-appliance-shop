package com.homeappliancesshop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "transactions_history")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionsHistory {
    @Id
    private String transactionId;
    private String date;
    private String status;
    private ArrayList<Transaction> transactions;

    public TransactionsHistory(){
        this.transactions = new ArrayList<>();
    }

    public boolean addNewTransaction(Transaction transaction){
        return transactions.add(transaction);
    }

}
