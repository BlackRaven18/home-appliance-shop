package com.homeappliancesshop.stripe;

import com.homeappliancesshop.dto.ProductDetailsArrayDTO;
import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClient {

    @Autowired
    public StripeClient(StripeConfigData customStripeConfigData) {
        Stripe.apiKey = customStripeConfigData.getKey();
    }

    public Customer createCustomer(String token, String email) throws Exception {
        Map<String, Object> customerParams = new HashMap<String, Object>();
        customerParams.put("email", email);
        customerParams.put("source", token);
        return Customer.create(customerParams);
    }

    private Customer getCustomer(String id) throws Exception {
        return Customer.retrieve(id);
    }

    public Charge chargeNewCard(String token, ProductDetailsArrayDTO productDetailsArrayDTO) throws Exception {
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(5 * 100));
        chargeParams.put("currency", "PLN");
        chargeParams.put("source", token);
        Charge charge = Charge.create(chargeParams);
        return charge;
    }
}