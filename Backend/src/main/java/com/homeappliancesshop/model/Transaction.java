package com.homeappliancesshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
public class Transaction {
    private String date;
    private ArrayList<ProductInTransaction> products;
    private double totalAmount;
}
