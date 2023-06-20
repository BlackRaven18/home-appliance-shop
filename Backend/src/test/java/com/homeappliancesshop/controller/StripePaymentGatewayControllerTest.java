package com.homeappliancesshop.controller;

import com.homeappliancesshop.dto.ChargeStatusDTO;
import com.homeappliancesshop.dto.OrderDetailsDTO;
import com.homeappliancesshop.dto.ProductDetailsDTO;
import com.homeappliancesshop.service.StripeClientService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.mockito.Mockito.*;

class StripePaymentGatewayControllerTest {
    @InjectMocks
    private StripePaymentGatewayController stripePaymentGatewayController;

    @Mock
    private StripeClientService stripeClientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        stripePaymentGatewayController = new StripePaymentGatewayController(stripeClientService);
    }

    @AfterEach
    void clear() { reset(stripeClientService); }

    @Test
    public void chargeCard() {
        String token = "test-token";
        OrderDetailsDTO orderDetailsDTO = new OrderDetailsDTO();
        orderDetailsDTO.setBuyerId("test-buyer");
        orderDetailsDTO.setDeliveryMethod("test-delivery");
        ProductDetailsDTO product1 = new ProductDetailsDTO();
        product1.setProductId("p1");
        product1.setQuantity(2);
        ProductDetailsDTO product2 = new ProductDetailsDTO();
        product2.setProductId("p2");
        product2.setQuantity(1);
        orderDetailsDTO.setProductDetailsDTO(new ProductDetailsDTO[]{product1, product2});

        ChargeStatusDTO expectedChargeStatus = new ChargeStatusDTO();
        expectedChargeStatus.setStatus("success");
        expectedChargeStatus.setMessage("Payment charged successfully");

        when(stripeClientService.chargeNewCard(token, orderDetailsDTO)).thenReturn(expectedChargeStatus);

        ChargeStatusDTO response = stripePaymentGatewayController.chargeCard(orderDetailsDTO, token);

        assertEquals(expectedChargeStatus, response);
    }
}