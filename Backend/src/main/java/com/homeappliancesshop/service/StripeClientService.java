package com.homeappliancesshop.service;

import com.homeappliancesshop.dto.OrderDetailsDTO;
import com.homeappliancesshop.dto.ProductDetailsDTO;
import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.stripe.StripeConfigData;
import com.stripe.Stripe;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeClientService {

    @Autowired
    private ProductService productService;

    @Autowired
    private PersonService personService;

    @Autowired
    public StripeClientService(StripeConfigData customStripeConfigData) {
        Stripe.apiKey = customStripeConfigData.getKey();
    }

    public Charge chargeNewCard(String token, OrderDetailsDTO orderDetailsDTO) throws Exception {
        Map<String, Object> chargeParams = new HashMap<>();
        int totalAmount = calculateAmountOfProductsInOrder(orderDetailsDTO.getProductDetailsDTO());

        chargeParams.put("amount", totalAmount);
        chargeParams.put("currency", "PLN");
        chargeParams.put("source", token);

        Transaction transaction = new Transaction(orderDetailsDTO, (double)totalAmount / 100);
        System.out.println(transaction);

        Charge charge = Charge.create(chargeParams);

        personService.addTransaction(orderDetailsDTO.getBuyerId(), transaction);

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
