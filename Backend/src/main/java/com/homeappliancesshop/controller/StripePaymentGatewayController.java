package com.homeappliancesshop.controller;

import com.homeappliancesshop.stripe.StripeClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class StripePaymentGatewayController {

    private StripeClient stripeClient;


    @Autowired
    StripePaymentGatewayController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

    @PostMapping("/charge")
    public String chargeCard(
            @RequestHeader(value="token") String token,
            @RequestHeader(value="amount") Double amount) throws Exception {
        return this.stripeClient.chargeNewCard(token, amount).toJson();
    }
}