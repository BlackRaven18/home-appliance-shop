package com.homeappliancesshop.service;

import com.homeappliancesshop.model.SafeUser;
import com.homeappliancesshop.repository.SafeUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Service
public class MongoAuthSafeUserDetailService  implements UserDetailsService {

    @Autowired
    private SafeUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SafeUser user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }

        return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }



//
//    @Override
//    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
//
//        com.homeappliancesshop.model.SafeUser user = userRepository.findByUsername(userName);
//
//        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
//
////        user.getAuthorities()
////                .forEach(role -> {
////                    grantedAuthorities.add(new SimpleGrantedAuthority(role.
////                            .getName()));
////                });
//
//        return new User(user.getUsername(), user.getPassword(), grantedAuthorities);
//    }
}
