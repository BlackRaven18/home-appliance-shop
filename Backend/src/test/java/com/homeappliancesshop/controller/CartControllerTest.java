package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Cart;
import com.homeappliancesshop.service.CartService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CartControllerTest {
    @InjectMocks
    private CartController cartController;

    @Mock
    private CartService cartService;

    @BeforeEach
    void setUp() { MockitoAnnotations.openMocks(this); }

    @AfterEach
    void clear() { reset(cartService); }

    @Test
    void getCarts() {
        List<Cart> expectedCarts = new ArrayList<>();
        when(cartService.findAllCarts()).thenReturn(expectedCarts);

        List<Cart> result = cartController.getCarts();

        assertEquals(expectedCarts, result);
        verify(cartService, times(1)).findAllCarts();
    }

    @Test
    void getCartById() {
        String cartId = "123";
        Cart expectedCart = new Cart();
        when(cartService.getCartById(cartId)).thenReturn(expectedCart);

        Cart result = cartController.getCartById(cartId);
        assertEquals(expectedCart, result);
        verify(cartService, times(1)).getCartById(cartId);
    }

    @Test
    void createCart() {
        Cart cart = new Cart();
        Cart savedCart = new Cart();
        cart.setName("Asus M509DA");
        cart.setBrand("Asus");
        cart.setColor("Grey");
        cart.setSpecification("procek git, karta git, ale troche sie grzeje");
        cart.setPrice(1999.99);
        cart.setImageURL("https://i.imgur.com/83S7Hof.png");

        when(cartService.addCart(cart)).thenReturn(savedCart);

        Cart result = cartController.createCart(cart);

        assertEquals(savedCart, result);
        verify(cartService, times(1)).addCart(cart);
    }

    @Test
    void testCreateCart_Error() {
        Cart cart = new Cart();
        when(cartService.addCart(cart)).thenThrow(new RuntimeException("Some error occurred."));

        RuntimeException exception =
                assertThrows(RuntimeException.class, () -> {
                    cartController.createCart(cart);
                });

        assertEquals("Some error occurred.", exception.getMessage());
        verify(cartService, times(1)).addCart(cart);
    }

    @Test
    void modifyCart() {
        Cart cart = new Cart();
        Cart updatedCart = new Cart();
        when(cartService.updateCart(cart)).thenReturn(updatedCart);

        Cart result = cartController.modifyCart(cart);

        assertEquals(updatedCart, result);
        verify(cartService, times(1)).updateCart(cart);
    }

    @Test
    void deleteCart() {
        String cartId = "123";
        when(cartService.deleteCart(cartId)).thenReturn("Deleted");

        String result = cartController.deleteCart(cartId);

        assertEquals("Deleted", result);
        verify(cartService, times(1)).deleteCart(cartId);
    }
}