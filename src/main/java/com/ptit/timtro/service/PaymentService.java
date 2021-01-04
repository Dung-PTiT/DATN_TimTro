package com.ptit.timtro.service;

import com.ptit.timtro.model.Payment;
import com.ptit.timtro.util.FetchEnablePostRequest;

import java.util.Date;
import java.util.List;

public interface PaymentService {
    void create(Payment payment);

    void updateStatusByPostId(Integer postId);

    void updateStatusById(Integer id, Boolean status);

    List<Payment> getByUserId(Integer userId);

    List<Payment> fetchEnablePost(FetchEnablePostRequest fetchEnablePostRequest);

    List<Payment> getAll();

    List<Payment> getEnablePost(Date date);
}
