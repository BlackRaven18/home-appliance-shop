package com.homeappliancesshop.model;

import com.homeappliancesshop.dto.OrderDetailsDTO;
import com.homeappliancesshop.dto.ProductDetailsDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

@Data
@NoArgsConstructor
@Document(collection = "transactions")
public class Transaction {

    private static final String DATE_FORMAT = "dd.MM.yyyy HH:mm";

    @Id
    private String transactionId;
    private String date;
    private String status;
    private ArrayList<ProductInTransaction> products;
    private double totalAmount;
    private String deliveryMethod;

    public Transaction(OrderDetailsDTO orderDetailsDTO, double totalAmount){
        this.date = getCurrentDate();
        this.status = "processed";
        this.products = new ArrayList<>();
        this.totalAmount = totalAmount;
        this.deliveryMethod = orderDetailsDTO.getDeliveryMethod();

        for(ProductDetailsDTO pd : orderDetailsDTO.getProductDetailsDTO()){
            ProductInTransaction pit = new ProductInTransaction();
            pit.setPrice(pd.getPrice());
            pit.setProductId(pd.getProductId());
            pit.setQuantity(pd.getQuantity());
            pit.setName(pd.getName());
            pit.setImageURL(pd.getImageURL());

            this.products.add(pit);
        }
    }

    private String getCurrentDate(){
        SimpleDateFormat formatter = new SimpleDateFormat(DATE_FORMAT);
        Date date = new Date();
        return formatter.format(date);
    }

}
