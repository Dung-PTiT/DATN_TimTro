package com.ptit.timtro.service;

import com.ptit.timtro.model.Payment;
import com.ptit.timtro.util.FetchEnablePostRequest;

import java.util.List;

public interface PaymentService {
    void create(Payment payment);

    List<Payment> fetchEnablePost(FetchEnablePostRequest fetchEnablePostRequest);
}
