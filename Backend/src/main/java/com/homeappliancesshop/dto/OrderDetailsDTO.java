package com.homeappliancesshop.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderDetailsDTO {
    private String buyerId;
    private String deliveryMethod;
    private ProductDetailsDTO[] productDetailsDTO;
}
