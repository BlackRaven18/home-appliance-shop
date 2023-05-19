package com.homeappliancesshop.service;
import com.homeappliancesshop.model.Cart;
import com.homeappliancesshop.model.Category;
import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.repository.CartRepository;
import com.homeappliancesshop.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class CartService {
    @Autowired
    private CartRepository repository;

    public List<Cart> findAllCarts(){
        return repository.findAll();
    }

    public Cart getCartById(String cartId){
        return repository.findById(cartId).get();
    }

    public Cart addCart(Cart cart){
        return repository.save(cart);
}

    @DocumentReference
    private Category category;
    public Cart updateCart(Cart cartRequest){
        Cart existingCart = repository.findById(cartRequest.getCartId()).get();
        existingCart.setName(cartRequest.getName());
        existingCart.setBrand(cartRequest.getBrand());
        existingCart.setColor(cartRequest.getColor());
        existingCart.setSpecification(cartRequest.getSpecification());
        existingCart.setPrice(cartRequest.getPrice());
        existingCart.setImageURL(cartRequest.getImageURL());
        return repository.save(existingCart);
    }

    public String deleteCart(String cartId){
        repository.deleteById(cartId);
        return cartId + "cart deleted from database";
    }
}
