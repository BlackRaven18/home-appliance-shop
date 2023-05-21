package com.homeappliancesshop.service;

import com.homeappliancesshop.dto.OrderDetailsDTO;
import com.homeappliancesshop.dto.ProductDetailsDTO;
import com.homeappliancesshop.stripe.StripeConfigData;
import com.stripe.Stripe;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeClientService {

    private final ProductService productService;

    @Autowired
    public StripeClientService(StripeConfigData customStripeConfigData, ProductService productService) {
        Stripe.apiKey = customStripeConfigData.getKey();

        this.productService = productService;
    }

    public Charge chargeNewCard(String token, OrderDetailsDTO orderDetailsDTO) throws Exception {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", calculateAmountOfProductsInOrder(orderDetailsDTO.getProductDetailsDTO()));
        chargeParams.put("currency", "PLN");
        chargeParams.put("source", token);
        Charge charge = Charge.create(chargeParams);
        return charge;
    }

    private  int calculateAmountOfProductsInOrder(ProductDetailsDTO[] productDetails) {
        double amount = 0;

        for(ProductDetailsDTO pd : productDetails){
            amount += pd.getQuantity() * productService.getProductById(pd.getProductId()).getPrice();
        }

        return (int)(amount * 100);
    }

}
