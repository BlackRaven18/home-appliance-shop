//package com.homeappliancesshop.service;
//
//import com.homeappliancesshop.dto.ChargeStatusDTO;
//import com.homeappliancesshop.dto.OrderDetailsDTO;
//import com.homeappliancesshop.dto.ProductDetailsDTO;
//import com.homeappliancesshop.model.Transaction;
//import com.stripe.exception.StripeException;
//import com.stripe.model.Charge;
//import com.stripe.model.Product;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//class StripeClientServiceTest {
//    @InjectMocks
//    private StripeClientService stripeClientService;
//
//    @Mock
//    private ProductService productService;
//
//    @Mock
//    private PersonService personService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @AfterEach
//    void clear() {
//        reset(productService);
//        reset(personService);
//    }
//
//    @Test
//    void testChargeNewCard_SuccessfulPayment() throws StripeException {
//        String token = "stripeToken";
//
//        OrderDetailsDTO orderDetailsDTO = new OrderDetailsDTO();
//        ProductDetailsDTO productDetailsDTO = new ProductDetailsDTO();
//        productDetailsDTO.setProductId("productId");
//        productDetailsDTO.setQuantity(2);
//        orderDetailsDTO.setProductDetailsDTO(new ProductDetailsDTO[]{productDetailsDTO});
//        orderDetailsDTO.setBuyerId("buyerId");
//
//        ChargeStatusDTO expectedChargeStatusDTO = new ChargeStatusDTO();
//        expectedChargeStatusDTO.setStatus("succeeded");
//        expectedChargeStatusDTO.setMessage("payment succeeded");
//
//        int totalAmount = 2000;
//
//        Map<String, Object> chargeParams = new HashMap<>();
//        chargeParams.put("amount", totalAmount);
//        chargeParams.put("currency", "PLN");
//        chargeParams.put("source", token);
//
//        Charge charge = new Charge();
//        charge.setStatus("succeeded");
//
//        Transaction transaction = new Transaction(orderDetailsDTO, 20.0);
//
//        when(productService.getProductById(productDetailsDTO.getProductId())).thenReturn(new Product());
//        when(Charge.create(chargeParams)).thenReturn(charge);
//
//        ChargeStatusDTO result = stripeClientService.chargeNewCard(token, orderDetailsDTO);
//
//        assertEquals(expectedChargeStatusDTO, result);
//        verify(personService, times(1)).addTransaction(orderDetailsDTO.getBuyerId(), transaction);
//    }
//
//    @Test
//    void testChargeNewCard_FailedPayment() throws StripeException {
//        String token = "stripeToken";
//
//        OrderDetailsDTO orderDetailsDTO = new OrderDetailsDTO();
//        ProductDetailsDTO productDetailsDTO = new ProductDetailsDTO();
//        productDetailsDTO.setProductId("productId");
//        productDetailsDTO.setQuantity(2);
//        orderDetailsDTO.setProductDetailsDTO(new ProductDetailsDTO[]{productDetailsDTO});
//        orderDetailsDTO.setBuyerId("buyerId");
//
//        ChargeStatusDTO expectedChargeStatusDTO = new ChargeStatusDTO();
//        expectedChargeStatusDTO.setStatus("failed");
//        expectedChargeStatusDTO.setMessage("Payment failed due to: Stripe error message");
//
//        int totalAmount = 2000;
//
//        Map<String, Object> chargeParams = new HashMap<>();
//        chargeParams.put("amount", totalAmount);
//        chargeParams.put("currency", "PLN");
//        chargeParams.put("source", token);
//
//        StripeException stripeException = new StripeException("Stripe error message", "stripeErrorCode", 400, null, null);
//
//        Transaction transaction = new Transaction(orderDetailsDTO, 20.0);
//
//        when(productService.getProductById(productDetailsDTO.getProductId())).thenReturn(new Product());
//        when(Charge.create(chargeParams)).thenThrow(stripeException);
//
//        ChargeStatusDTO result = stripeClientService.chargeNewCard(token, orderDetailsDTO);
//
//        assertEquals(expectedChargeStatusDTO, result);
//        verify(personService, times(1)).addTransaction(orderDetailsDTO.getBuyerId(), transaction);
//    }
//}
