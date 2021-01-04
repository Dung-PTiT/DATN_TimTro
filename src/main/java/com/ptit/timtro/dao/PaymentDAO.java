package com.ptit.timtro.dao;

import com.ptit.timtro.entity.PaymentEntity;
import com.ptit.timtro.util.FetchEnablePostRequest;

import java.util.Date;
import java.util.List;

public interface PaymentDAO {
    void create(PaymentEntity paymentEntity);

    void updateStatusByPostId(Integer postId);

    void updateStatusById(Integer id, Boolean status);

    List<PaymentEntity> getByUserId(Integer userId);

    List<PaymentEntity> fetchEnablePost(FetchEnablePostRequest fetchEnablePostRequest);

    List<PaymentEntity> getAll();

    List<Integer> removeExpiredPosts(Date date);

    List<PaymentEntity> getEnablePost(Date date);
}
