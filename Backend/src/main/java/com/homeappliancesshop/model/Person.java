package com.homeappliancesshop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;

@Document(collection = "persons")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    @Id
    private String personId;
    private String name;
    private String surname;
    private String email;
    private String password;
    private String phoneNumber;
    private ArrayList<String> roles;

    @DocumentReference
    private Address address;

    @DocumentReference
    private TransactionsHistory transactionsHistory;

}
