package com.homeappliancesshop.model;

import com.homeappliancesshop.dto.OrderDetailsDTO;
import com.homeappliancesshop.dto.ProductDetailsDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

@Data
@NoArgsConstructor
public class Transaction {
    private String date;
    private String status;
    private ArrayList<ProductInTransaction> products;
    private double totalAmount;

    public Transaction(OrderDetailsDTO orderDetailsDTO, double totalAmount){
        this.date = getCurrentDate();
        this.status = "processed";
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

    private String getCurrentDate(){
        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy HH:mm");
        Date date = new Date();
        return formatter.format(date);
    }

}
