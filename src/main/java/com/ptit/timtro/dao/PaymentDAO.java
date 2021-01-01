package com.ptit.timtro.dao;

import com.ptit.timtro.entity.PaymentEntity;
import com.ptit.timtro.util.FetchEnablePostRequest;

import java.util.List;

public interface PaymentDAO {
    void create(PaymentEntity paymentEntity);

    void updateStatusByPostId(Integer postId);

    List<PaymentEntity> getByUserId(Integer userId);

    List<PaymentEntity> fetchEnablePost(FetchEnablePostRequest fetchEnablePostRequest);
}
