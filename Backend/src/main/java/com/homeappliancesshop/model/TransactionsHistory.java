package com.homeappliancesshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;

@Document(collection = "transactions_history")
@Data
@NoArgsConstructor
public class TransactionsHistory {
    @Id
    private String transactionId;

    @DocumentReference
    private ArrayList<Transaction> transactions;
}
