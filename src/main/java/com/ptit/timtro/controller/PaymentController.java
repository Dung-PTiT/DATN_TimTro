package com.ptit.timtro.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptit.timtro.model.Payment;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.model.Wallet;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.security.UserPrincipal;
import com.ptit.timtro.service.PaymentService;
import com.ptit.timtro.service.PostService;
import com.ptit.timtro.service.WalletService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PostService postService;

    @Autowired
    private WalletService walletService;

    @PostMapping("/post/push")
    public DataResponse<String> create(@RequestParam("payment") String paymentResp) {
        try {
            Payment payment = new ObjectMapper().readValue(paymentResp, Payment.class);
            postService.updateStatus(payment.getPost().getId());

            UserPrincipal userPrincipal = AdvancedSecurityContextHolder.getUserPrincipal();
            Wallet wallet = walletService.getByUserId(userPrincipal.getId());
            int newBalance = wallet.getBalance() - payment.getPrice();
            wallet.setBalance(newBalance);
            walletService.update(wallet);

            paymentService.create(payment);
            return new DataResponse<>(true, "Đăng bài thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, "Lỗi");
        }
    }
}
