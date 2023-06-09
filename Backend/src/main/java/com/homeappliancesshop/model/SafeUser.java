package com.homeappliancesshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

@Document(collection = "safe_users")
@Data
@NoArgsConstructor
public class SafeUser {

    @Id
    private String id;
    private String username;
    private String password;

}
