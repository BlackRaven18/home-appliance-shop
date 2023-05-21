package com.homeappliancesshop.controller;

import com.homeappliancesshop.dto.ProductDetailsArrayDTO;
import com.homeappliancesshop.dto.ProductDetailsDTO;
import com.homeappliancesshop.service.StripeClientService;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class StripePaymentGatewayController {

    private final StripeClientService stripeClientService;

    public StripePaymentGatewayController(StripeClientService stripeClientService) {
        this.stripeClientService = stripeClientService;
    }


    @PostMapping("/charge")
    public String chargeCard(
            @RequestBody ProductDetailsArrayDTO productDetailsArrayDTO,
            @RequestHeader(value = "token") String token) throws Exception {

        for (ProductDetailsDTO pd : productDetailsArrayDTO.getProductDetailsDTO()) {
            System.out.println(pd.getProductId() + " : " + pd.getQuantity());
        }

        return this.stripeClientService.chargeNewCard(token, productDetailsArrayDTO).toJson();
    }
}