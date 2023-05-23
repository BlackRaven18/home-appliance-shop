package com.homeappliancesshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductInTransaction {
    private String productId;
    private double price;
    private int quantity;
}
