package com.ptit.timtro.controller;

import com.ptit.timtro.config.PayPalConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;


@RestController
public class PayPalController {

    private final PayPalConfig payPalConfig;

    @Autowired
    PayPalController(PayPalConfig payPalConfig) {
        this.payPalConfig = payPalConfig;
    }

    @PostMapping(value = "/paypal/make/payment")
    public Map<String, Object> makePayment(@RequestParam("sum") String sum) {
        return payPalConfig.createPayment(sum);
    }

    @PostMapping(value = "/paypal/complete/payment")
    public Map<String, Object> completePayment(HttpServletRequest request) {
        return payPalConfig.completePayment(request);
    }
}
