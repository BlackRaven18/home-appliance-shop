package com.homeappliancesshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@NoArgsConstructor
class ProductInTransaction{
    private String productId;
    private double price;
}

@Data
@NoArgsConstructor
class Transaction {
    private String date;
    private ArrayList<ProductInTransaction> products;
    private double totalAmount;
}

@Document(collection = "transactions_history")
@Data
@NoArgsConstructor
public class TransactionsHistory {
    @Id
    private String id;
    private String personId;
    private ArrayList<Transaction> transactions;

}
