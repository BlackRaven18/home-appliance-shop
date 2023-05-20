package com.homeappliancesshop.controller;

import com.homeappliancesshop.stripe.StripeClient;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.tags.Param;

@Data
@NoArgsConstructor
class Details{
    private ProductDetails[] productDetails;
}

@Data
@NoArgsConstructor
class ProductDetails{
    private int quantity;
    private String productId;
}

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
            @RequestBody Details productDetails,
            @RequestHeader(value="token") String token,
            @RequestHeader(value="amount") Double amount) throws Exception {

        for(ProductDetails pd : productDetails.getProductDetails()){
            System.out.println(pd.getProductId() + " : " +  pd.getQuantity());
        }
        //System.out.println(productDetails.getProductDetails().getProductId());

//        for(Parameters p : params){
//            System.out.println(p.productId + " : " + p.quantity);
//        }
        return this.stripeClient.chargeNewCard(token, amount).toJson();
    }
}