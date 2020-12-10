package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.PaymentDAO;
import com.ptit.timtro.entity.PaymentEntity;
import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.entity.PostVipEntity;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.model.Payment;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentDAO paymentDAO;

    @Override
    public void create(Payment payment) {
        PaymentEntity paymentEntity = new PaymentEntity();

        paymentEntity.setPrice(payment.getPrice());
        paymentEntity.setStartDate(payment.getStartDate());
        paymentEntity.setEndDate(payment.getEndDate());
        paymentEntity.setDescription("<p>Thời gian đăng trong " + payment.getDescription()
                + "</p><p>" + payment.getPostVip().toString() + "</p>");
        paymentEntity.setStatus(true);

        UserEntity userEntity = new UserEntity();
        userEntity.setId(AdvancedSecurityContextHolder.getUserPrincipal().getId());
        paymentEntity.setUserEntity(userEntity);

        PostEntity postEntity = new PostEntity();
        postEntity.setId(payment.getPost().getId());
        paymentEntity.setPostEntity(postEntity);

        PostVipEntity postVipEntity = new PostVipEntity();
        postVipEntity.setId(payment.getPostVip().getId());
        paymentEntity.setPostVipEntity(postVipEntity);

        paymentDAO.create(paymentEntity);
    }
}
