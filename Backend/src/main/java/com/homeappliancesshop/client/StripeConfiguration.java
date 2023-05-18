package com.homeappliancesshop.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:/stripe.properties")
public class StripeConfiguration {

    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    @Bean
    public StripeConfigData customStripeConfigData() {
        StripeConfigData stripeConfigData = new StripeConfigData();
        stripeConfigData.setKey(stripeSecretKey);
        return stripeConfigData;
    }
}
