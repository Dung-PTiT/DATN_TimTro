package com.ptit.timtro.service;

import com.ptit.timtro.model.Payment;
import com.ptit.timtro.util.FetchEnablePostRequest;

import java.util.List;

public interface PaymentService {
    void create(Payment payment);

    void updateStatusByPostId(Integer postId);

    List<Payment> getByUserId(Integer userId);

    List<Payment> fetchEnablePost(FetchEnablePostRequest fetchEnablePostRequest);
}
