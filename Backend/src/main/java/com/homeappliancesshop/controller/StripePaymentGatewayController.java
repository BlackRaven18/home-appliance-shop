package com.homeappliancesshop.controller;

import com.homeappliancesshop.dto.ChargeStatusDTO;
import com.homeappliancesshop.dto.OrderDetailsDTO;
import com.homeappliancesshop.dto.ProductDetailsDTO;
import com.homeappliancesshop.service.StripeClientService;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/api/payment")
public class StripePaymentGatewayController {

    private final StripeClientService stripeClientService;

    public StripePaymentGatewayController(StripeClientService stripeClientService) {
        this.stripeClientService = stripeClientService;
    }


    @PostMapping("/charge")
    public ChargeStatusDTO chargeCard(
            @RequestBody OrderDetailsDTO orderDetailsDTO,
            @RequestHeader(value = "token") String token) {

        System.out.println(orderDetailsDTO.getBuyerId());
        for (ProductDetailsDTO pd : orderDetailsDTO.getProductDetailsDTO()) {

            System.out.println(pd.getProductId() + " : " + pd.getQuantity());
        }

        return this.stripeClientService.chargeNewCard(token, orderDetailsDTO);
    }
}