package com.homeappliancesshop.controller;

import com.homeappliancesshop.dto.ProductDetailsArrayDTO;
import com.homeappliancesshop.dto.ProductDetailsDTO;
import com.homeappliancesshop.stripe.StripeClient;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.tags.Param;



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
            @RequestBody ProductDetailsArrayDTO productDetailsArrayDTO,
            @RequestHeader(value="token") String token) throws Exception {

        for(ProductDetailsDTO pd : productDetailsArrayDTO.getProductDetailsDTO()){
            System.out.println(pd.getProductId() + " : " +  pd.getQuantity());
        }

        return this.stripeClient.chargeNewCard(token, productDetailsArrayDTO).toJson();
    }
}