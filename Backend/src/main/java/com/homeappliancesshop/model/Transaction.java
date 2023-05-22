package com.homeappliancesshop.model;

import com.homeappliancesshop.dto.OrderDetailsDTO;
import com.homeappliancesshop.dto.ProductDetailsDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@NoArgsConstructor
public class Transaction {
    private String date;
    private ArrayList<ProductInTransaction> products;
    private double totalAmount;

    public Transaction(OrderDetailsDTO orderDetailsDTO, double totalAmount){
        this.date = "15.12.3999";
        this.products = new ArrayList<>();
        this.totalAmount = totalAmount;

        for(ProductDetailsDTO pd : orderDetailsDTO.getProductDetailsDTO()){
            ProductInTransaction pit = new ProductInTransaction();
            pit.setPrice(pd.getPrice());
            pit.setProductId(pd.getProductId());
            pit.setQuantity(pd.getQuantity());

            this.products.add(pit);
        }

    }
}
