package com.homeappliancesshop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document(collection = "cart")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Cart {
    @Id
    private String cartId;
    private String name;
    private String brand;
    private String color;
    private String specification;
    private double price;
    private String imageURL;

    @DocumentReference
    private Category category;
}
