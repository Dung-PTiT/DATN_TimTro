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
import com.ptit.timtro.util.FetchEnablePostRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

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
            postService.updateStatus(payment.getPost().getId(), true);

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

    @GetMapping("/payment/get-by-user-id")
    public DataResponse<List<Payment>> fetchEnablePost(@RequestParam("userId") Integer userId) {
        try {
            List<Payment> payments = paymentService.getByUserId(userId);
            if (payments != null) {
                return new DataResponse<>(true, payments);
            } else {
                return new DataResponse<>(false, null);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

    @PostMapping("/payment/get-all-enable-post")
    public DataResponse<List<Payment>> fetchEnablePost(@RequestParam("provinceId") String provinceId, @RequestParam("districtId") String districtId,
                                                       @RequestParam("wardId") String wardId,
                                                       @RequestParam("minPrice") String minPrice, @RequestParam("maxPrice") String maxPrice,
                                                       @RequestParam("minAcreage") String minAcreage, @RequestParam("maxAcreage") String maxAcreage,
                                                       @RequestParam("categoryId") String categoryId) {
        try {
            FetchEnablePostRequest fetchEnablePostRequest = new FetchEnablePostRequest(provinceId, districtId, wardId, minPrice, maxPrice, minAcreage, maxAcreage, categoryId);
            List<Payment> payments = paymentService.fetchEnablePost(fetchEnablePostRequest);
            if (payments != null) {
                return new DataResponse<>(true, payments);
            } else {
                return new DataResponse<>(false, null);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

    @GetMapping("/payment/get-all")
    public DataResponse<List<Payment>> getAll() {
        try {
            List<Payment> payments = paymentService.getAll();
            if (payments != null) {
                return new DataResponse<>(true, payments);
            } else {
                return new DataResponse<>(false, null);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }
}
