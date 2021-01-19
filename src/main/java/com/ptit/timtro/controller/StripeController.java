package com.ptit.timtro.controller;

import com.ptit.timtro.config.StripeService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class StripeController {
    @Value("${stripe.key.public}")
    private String API_PUBLIC_KEY;

    @Autowired
    private StripeService stripeService;

    @PostMapping("/stripe/create-charge")
    public @ResponseBody
    DataResponse<String> createCharge(String token, Integer amount) {

        if (token == null) {
            return new DataResponse<>(false, "Tạo token lỗi. Thử tạo lại.");
        }

        String chargeId = stripeService.createCharge(token, amount);// 999 -> 9.99 usd

        if (chargeId == null) {
            return new DataResponse<>(false, "Nạp tiền không thành công có lỗi xảy ra.");
        }

        return new DataResponse<>(true, "Nạp tiền thành công");
    }
}
