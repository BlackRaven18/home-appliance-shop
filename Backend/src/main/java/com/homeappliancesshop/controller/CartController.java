package com.homeappliancesshop.controller;
import com.homeappliancesshop.model.Cart;
import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.service.CartService;
import com.homeappliancesshop.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService service;

    @GetMapping
    public List<Cart> getCarts(){
        return service.findAllCarts();
    }

    @GetMapping("/{cartId}")
    public Cart getPersonById(@PathVariable String cartId){
        return service.getCartById(cartId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cart createCart(@RequestBody Cart cart){
        return service.addCart(cart);
    }

    @PutMapping
    public Cart modifyCart(@RequestBody Cart cart){
        return service.updateCart(cart);
    }

    @DeleteMapping("/{cartId}")
    public String deleteCart(@PathVariable String cartId){
        return service.deleteCart(cartId);
    }

}
