package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Cart;
import com.homeappliancesshop.repository.CartRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CartServiceTest {
    @InjectMocks
    private CartService cartService;

    @Mock
    private CartRepository cartRepository;

    @BeforeEach
    public void setUp() {
         MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void clear() { reset(cartRepository); }

    @Test
    void findAllCarts() {
        List<Cart> carts = new ArrayList<>();
        carts.add(new Cart());
        carts.add(new Cart());

        when(cartRepository.findAll()).thenReturn(carts);

        List<Cart> result = cartService.findAllCarts();

        assertEquals(carts.size(), result.size());
        verify(cartRepository, times(1)).findAll();
    }

    @Test
    void getCartById() {
        String cartId = "123";
        Cart cart = new Cart();
        cart.setCartId(cartId);

        when(cartRepository.findById(cartId)).thenReturn(Optional.of(cart));

        Cart result = cartService.getCartById(cartId);

        assertEquals(cartId, result.getCartId());
        verify(cartRepository, times(1)).findById(cartId);
    }

    @Test
    void addCart() {
        Cart cart = new Cart();
        cart.setName("Asus M509DA");
        cart.setBrand("Asus");
        cart.setColor("Grey");
        cart.setSpecification("procek git, karta git, ale troche sie grzeje");
        cart.setPrice(1999.99);
        cart.setImageURL("https://i.imgur.com/83S7Hof.png");

        when(cartRepository.save(cart)).thenReturn(cart);

        Cart result = cartService.addCart(cart);

        assertEquals(cart, result);
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    void updateCart() {
        String cartId = "123";
        Cart existingCart = new Cart();
        existingCart.setCartId(cartId);
        existingCart.setName("Old Name");

        Cart updatedCart = new Cart();
        updatedCart.setCartId(cartId);
        updatedCart.setName("New Name");

        when(cartRepository.findById(cartId)).thenReturn(Optional.of(existingCart));
        when(cartRepository.save(existingCart)).thenReturn(updatedCart);

        Cart result = cartService.updateCart(updatedCart);

        assertEquals(updatedCart.getName(), result.getName());
        verify(cartRepository, times(1)).findById(cartId);
        verify(cartRepository, times(1)).save(existingCart);
    }

    @Test
    void deleteCart() {
        String cartId = "123";
        Cart cart = new Cart();
        cart.setCartId(cartId);

        String result = cartService.deleteCart(cartId);

        assertEquals(cartId + "cart deleted from database", result);
        verify(cartRepository, times(1)).deleteById(cartId);
    }
}