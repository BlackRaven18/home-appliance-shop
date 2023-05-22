package com.homeappliancesshop.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductDetailsDTO {
    private int quantity;
    private String productId;
    private double price;
}
