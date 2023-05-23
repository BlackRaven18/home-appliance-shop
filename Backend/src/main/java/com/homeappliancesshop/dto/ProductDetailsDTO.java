package com.homeappliancesshop.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductDetailsDTO {
    private int quantity;
    private String productId;
    private String name;
    private String imageURL;
    private double price;
}
