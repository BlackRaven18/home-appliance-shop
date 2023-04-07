package com.homeappliancesshop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private String phoneNumber;

}
