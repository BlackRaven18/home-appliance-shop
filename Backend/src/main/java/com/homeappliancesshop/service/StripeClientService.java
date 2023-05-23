package com.homeappliancesshop.service;

import com.homeappliancesshop.dto.ChargeStatusDTO;
import com.homeappliancesshop.dto.OrderDetailsDTO;
import com.homeappliancesshop.dto.ProductDetailsDTO;
import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.stripe.StripeConfigData;
import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.StripeException;
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

    public ChargeStatusDTO chargeNewCard(String token, OrderDetailsDTO orderDetailsDTO) {
        Map<String, Object> chargeParams = new HashMap<>();
        ChargeStatusDTO chargeStatusDTO = new ChargeStatusDTO();
        int totalAmount = calculateAmountOfProductsInOrder(orderDetailsDTO.getProductDetailsDTO());

        chargeParams.put("amount", totalAmount);
        chargeParams.put("currency", "PLN");
        chargeParams.put("source", token);

        Transaction transaction = new Transaction(orderDetailsDTO, (double)totalAmount / 100);
        System.out.println(transaction);

        Charge charge = null;

        try {
            charge = Charge.create(chargeParams);
            transaction.setStatus(charge.getStatus());

            chargeStatusDTO.setStatus("succeeded");
            chargeStatusDTO.setMessage("payment succeeded");

        }catch (StripeException e){
            System.out.println(e.getMessage());
            System.out.println("Stripe exception!!");

            transaction.setStatus("failed");

            chargeStatusDTO.setStatus("failed");
            chargeStatusDTO.setMessage("Payment failed due to: " + e.getMessage());
        }finally {
            personService.addTransaction(orderDetailsDTO.getBuyerId(), transaction);
        }

        return chargeStatusDTO;
    }

    private  int calculateAmountOfProductsInOrder(ProductDetailsDTO[] productDetails) {
        double amount = 0;

        for(ProductDetailsDTO pd : productDetails){
            amount += pd.getQuantity() * productService.getProductById(pd.getProductId()).getPrice();
        }

        return (int)(amount * 100);
    }

}
